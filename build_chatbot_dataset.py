import csv
import json
import re
import sys
import unicodedata
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path


APP_DIR = Path(__file__).resolve().parent
OUTPUT_DIR = APP_DIR / "chatbot-data-store"
SOURCE_PLAN = APP_DIR / "chatbot-source-plan.json"
DATASET_DIR = Path.home() / "Desktop" / "datasets"
SUPPORTED_INTENTS = {
    "greeting",
    "farewell",
    "crop_advice",
    "pest_control",
    "fertilizer",
    "irrigation",
    "soil_info",
    "weather",
    "market",
    "schemes",
    "app_help",
}


def normalize_text(text: str) -> str:
    value = unicodedata.normalize("NFKC", str(text or ""))
    value = value.replace("\ufffd", " ")
    value = re.sub(r"[\U00010000-\U0010ffff]", " ", value)
    value = re.sub(r"[^\w\s,-]", " ", value, flags=re.UNICODE)
    value = re.sub(r"\s+", " ", value).strip()
    return value


def normalize_token(text: str) -> str:
    value = normalize_text(text).lower()
    value = re.sub(r"[^\w\s]", " ", value)
    return re.sub(r"\s+", " ", value).strip()


def split_tags(raw_tags):
    value = str(raw_tags or "").strip()
    if not value:
        return []
    parts = re.split(r"[|,;/]+", value)
    return [normalize_text(part).lower() for part in parts if normalize_text(part)]


def read_csv(path: Path):
    encodings = ("utf-8-sig", "utf-8", "cp1252", "latin-1")
    last_error = None
    for encoding in encodings:
        try:
            with path.open(newline="", encoding=encoding, errors="replace") as handle:
                return list(csv.DictReader(handle))
        except UnicodeDecodeError as error:
            last_error = error
    raise last_error


def load_xlsx_rows(path: Path):
    with zipfile.ZipFile(path) as archive:
        shared_strings = []
        if "xl/sharedStrings.xml" in archive.namelist():
            root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
            shared_strings = [t.text or "" for t in root.iter() if t.tag.endswith("}t")]

        sheet = ET.fromstring(archive.read("xl/worksheets/sheet1.xml"))
        ns = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
        rows = []
        for row in sheet.findall(f".//{ns}row"):
            values = []
            for cell in row.findall(f"{ns}c"):
                value = cell.find(f"{ns}v")
                if value is None:
                    values.append("")
                elif cell.attrib.get("t") == "s":
                    values.append(shared_strings[int(value.text)])
                else:
                    values.append(value.text or "")
            rows.append(values)
    return rows


def extract_docx_text(path: Path):
    with zipfile.ZipFile(path) as archive:
        xml_name = "word/document.xml"
        if xml_name not in archive.namelist():
            return ""
        root = ET.fromstring(archive.read(xml_name))
        texts = [node.text or "" for node in root.iter() if node.tag.endswith("}t")]
        return " ".join(texts)


def load_source_plan():
    if not SOURCE_PLAN.exists():
        raise FileNotFoundError(f"Source plan not found: {SOURCE_PLAN}")
    return json.loads(SOURCE_PLAN.read_text(encoding="utf-8"))


def normalize_language(value: str) -> str:
    language = normalize_token(value)
    if language in {"en", "english"}:
        return "en"
    if language in {"hi", "hindi"}:
        return "hi"
    if language in {"mr", "marathi"}:
        return "mr"
    if language in {"hi roman", "hi_roman", "hindi roman"}:
        return "hi_roman"
    if language in {"mr roman", "mr_roman", "marathi roman"}:
        return "mr_roman"
    return language or "en"


def qa_row_to_entry(row, source_name: str, priority: str):
    intent = normalize_token(row.get("intent"))
    question = normalize_text(row.get("question"))
    answer = normalize_text(row.get("answer"))
    if not question or not answer:
        return None
    if intent and intent not in SUPPORTED_INTENTS:
        return None
    tags = split_tags(row.get("tags"))
    crop = normalize_token(row.get("crop"))
    topic = normalize_token(row.get("topic"))
    return {
        "intent": intent or "crop_advice",
        "topic": topic,
        "crop": crop,
        "question": question,
        "answer": answer,
        "language": normalize_language(row.get("language")),
        "tags": tags,
        "source": source_name,
        "priority": priority,
    }


def crop_row_to_entry(row):
    crop = normalize_token(row.get("crop"))
    variety = normalize_text(row.get("variety"))
    if not crop:
        return None
    return {
        "crop": crop,
        "variety": variety,
        "soil": normalize_text(row.get("soil")),
        "rainfall": normalize_text(row.get("rainfall")),
        "irrigation": normalize_text(row.get("irrigation")),
        "sowing_time": normalize_text(row.get("sowing_time")),
        "maturity_time": normalize_text(row.get("maturity_time")),
        "seed_rate": normalize_text(row.get("seed_rate")),
        "avg_yield": normalize_text(row.get("avg_yield")),
        "fertilizer": normalize_text(row.get("fertilizer")),
        "pesticide": normalize_text(row.get("pesticide")),
        "location": normalize_text(row.get("location")),
        "special_feature": normalize_text(row.get("special_feature")),
        "tags": split_tags(row.get("tags")),
        "language": normalize_language(row.get("language")),
        "state_focus": normalize_text(row.get("state_focus")),
    }


def intent_row_to_entry(row):
    query = normalize_text(row.get("query"))
    intent = normalize_token(row.get("intent"))
    if not query or not intent or intent not in SUPPORTED_INTENTS:
        return None
    return {
        "query": query,
        "intent": intent,
        "topic": normalize_token(row.get("topic")),
        "crop": normalize_token(row.get("crop")),
        "language": normalize_language(row.get("language")),
    }


def word_tag_to_entry(row):
    word = normalize_token(row.get("word"))
    label = normalize_token(row.get("label")).upper()
    label_full = normalize_token(row.get("label_full"))
    if not word or not label:
        return None
    return {
        "word": word,
        "label": label,
        "label_full": label_full or label.lower(),
    }


def dedupe_records(records, key_fn):
    seen = set()
    result = []
    for record in records:
        key = key_fn(record)
        if key in seen:
            continue
        seen.add(key)
        result.append(record)
    return result


def build_payload():
    plan = load_source_plan()
    qa_primary = []
    qa_secondary = []
    crop_profiles = []
    intent_examples = []
    word_tags = []

    for group in ("primary_sources", "secondary_sources"):
        priority = "primary" if group == "primary_sources" else "secondary"
        for item in plan.get(group, []):
            path = Path(item["file"])
            source_name = path.stem
            rows = read_csv(path)
            source_type = item.get("type")

            if source_type == "qa":
                target = qa_primary if priority == "primary" else qa_secondary
                target.extend(
                    filter(
                        None,
                        (qa_row_to_entry(row, source_name, priority) for row in rows),
                    )
                )
                continue

            if source_type == "crop_profiles":
                crop_profiles.extend(filter(None, (crop_row_to_entry(row) for row in rows)))
                continue

            if source_type == "intent_examples":
                intent_examples.extend(filter(None, (intent_row_to_entry(row) for row in rows)))
                continue

            if source_type == "word_tags":
                word_tags.extend(filter(None, (word_tag_to_entry(row) for row in rows)))

    qa_primary = dedupe_records(
        qa_primary,
        lambda row: (
            row["intent"],
            row["crop"],
            normalize_token(row["question"]),
            normalize_token(row["answer"]),
        ),
    )
    qa_secondary = dedupe_records(
        qa_secondary,
        lambda row: (
            row["intent"],
            row["crop"],
            normalize_token(row["question"]),
            normalize_token(row["answer"]),
        ),
    )
    crop_profiles = dedupe_records(
        crop_profiles,
        lambda row: (row["crop"], normalize_token(row["variety"]), row["state_focus"]),
    )
    intent_examples = dedupe_records(
        intent_examples,
        lambda row: (normalize_token(row["query"]), row["intent"], row["crop"]),
    )
    word_tags = dedupe_records(
        word_tags,
        lambda row: (row["word"], row["label"]),
    )

    return {
        "manifest": {
            "qa_primary": len(qa_primary),
            "qa_secondary": len(qa_secondary),
            "crop_profiles": len(crop_profiles),
            "intent_examples": len(intent_examples),
            "word_tags": len(word_tags),
            "supported_intents": sorted(SUPPORTED_INTENTS),
        },
        "qa_primary": qa_primary,
        "qa_secondary": qa_secondary,
        "crop_profiles": crop_profiles,
        "intent_examples": intent_examples,
        "word_tags": word_tags,
    }


def chunk_text(value: str) -> str:
    return normalize_text(value)


def build_search_chunks(payload):
    chunks = []

    for index, entry in enumerate(payload["qa_primary"]):
        text = chunk_text(f"Question: {entry['question']}. Answer: {entry['answer']}.")
        chunks.append({
            "id": f"qa-primary-{index}",
            "kind": "qa",
            "priority": "primary",
            "source": entry["source"],
            "intent": entry["intent"],
            "topic": entry["topic"],
            "crop": entry["crop"],
            "language": entry["language"],
            "tags": entry["tags"],
            "text": text,
        })

    for index, entry in enumerate(payload["qa_secondary"]):
        text = chunk_text(f"Question: {entry['question']}. Answer: {entry['answer']}.")
        chunks.append({
            "id": f"qa-secondary-{index}",
            "kind": "qa",
            "priority": "secondary",
            "source": entry["source"],
            "intent": entry["intent"],
            "topic": entry["topic"],
            "crop": entry["crop"],
            "language": entry["language"],
            "tags": entry["tags"],
            "text": text,
        })

    for index, profile in enumerate(payload["crop_profiles"]):
        text = chunk_text(
            f"{profile['crop']} {profile['variety']}. "
            f"Soil: {profile['soil']}. "
            f"Rainfall: {profile['rainfall']}. "
            f"Irrigation: {profile['irrigation']}. "
            f"Sowing time: {profile['sowing_time']}. "
            f"Maturity time: {profile['maturity_time']}. "
            f"Yield: {profile['avg_yield']}. "
            f"Fertilizer: {profile['fertilizer']}. "
            f"Pesticide: {profile['pesticide']}. "
            f"Location: {profile['location']}. "
            f"Special feature: {profile['special_feature']}."
        )
        chunks.append({
            "id": f"crop-profile-{index}",
            "kind": "crop_profile",
            "priority": "primary",
            "source": "crop_profiles",
            "intent": "crop_advice",
            "topic": "crop_profile",
            "crop": profile["crop"],
            "language": profile["language"],
            "tags": profile["tags"],
            "text": text,
            "state_focus": profile["state_focus"],
            "variety": profile["variety"],
        })

    return chunks


def chunk_from_text(source_id: str, kind: str, text: str, meta: dict | None = None):
    cleaned = chunk_text(text)
    if len(cleaned) < 24:
        return None
    return {
        "id": source_id,
        "kind": kind,
        "priority": "reference",
        "source": meta.get("source", kind) if meta else kind,
        "intent": meta.get("intent", "") if meta else "",
        "topic": meta.get("topic", "") if meta else "",
        "crop": meta.get("crop", "") if meta else "",
        "language": meta.get("language", "en") if meta else "en",
        "tags": meta.get("tags", []) if meta else [],
        "text": cleaned,
    }


def build_extra_document_chunks():
    chunks = []
    if not DATASET_DIR.exists():
        return chunks

    for path in sorted(DATASET_DIR.iterdir()):
        if not path.is_file():
            continue

        name = path.name
        suffix = path.suffix.lower()

        if suffix == ".csv":
            rows = read_csv(path)
            if rows:
                columns = [column for column in rows[0].keys() if column]
                header_chunk = chunk_from_text(
                    f"doc-{name}-header",
                    "document",
                    f"Dataset {name}. Columns: {', '.join(columns)}.",
                    {"source": name, "topic": "dataset_header"}
                )
                if header_chunk:
                    chunks.append(header_chunk)

            for index, row in enumerate(rows[:250]):
                parts = []
                crop = ""
                for key, value in row.items():
                    if not key or not str(value or "").strip():
                        continue
                    cleaned_value = normalize_text(value)
                    parts.append(f"{key}: {cleaned_value}")
                    if key.lower() in {"crop", "crop_name"} and cleaned_value:
                        crop = normalize_token(cleaned_value)
                chunk = chunk_from_text(
                    f"doc-{name}-{index}",
                    "document",
                    ", ".join(parts),
                    {"source": name, "topic": "raw_dataset", "crop": crop}
                )
                if chunk:
                    chunks.append(chunk)
            continue

        if suffix == ".json":
            data = json.loads(path.read_text(encoding="utf-8"))
            if isinstance(data, list):
                for index, item in enumerate(data[:250]):
                    text = json.dumps(item, ensure_ascii=False)
                    crop = normalize_token(item.get("crop", "")) if isinstance(item, dict) else ""
                    chunk = chunk_from_text(
                        f"doc-{name}-{index}",
                        "document",
                        text,
                        {"source": name, "topic": "json_dataset", "crop": crop}
                    )
                    if chunk:
                        chunks.append(chunk)
            else:
                chunk = chunk_from_text(
                    f"doc-{name}-0",
                    "document",
                    json.dumps(data, ensure_ascii=False),
                    {"source": name, "topic": "json_dataset"}
                )
                if chunk:
                    chunks.append(chunk)
            continue

        if suffix == ".xlsx":
            rows = load_xlsx_rows(path)
            for index, row in enumerate(rows[:200]):
                text = " | ".join(normalize_text(value) for value in row if normalize_text(value))
                chunk = chunk_from_text(
                    f"doc-{name}-{index}",
                    "document",
                    text,
                    {"source": name, "topic": "xlsx_dataset"}
                )
                if chunk:
                    chunks.append(chunk)
            continue

        if suffix == ".docx":
            text = extract_docx_text(path)
            paragraphs = [normalize_text(part) for part in re.split(r"\n{2,}|\.\s+", text) if normalize_text(part)]
            for index, para in enumerate(paragraphs[:120]):
                chunk = chunk_from_text(
                    f"doc-{name}-{index}",
                    "document",
                    para,
                    {"source": name, "topic": "docx_notes"}
                )
                if chunk:
                    chunks.append(chunk)
            continue

        if suffix in {".html", ".htm"}:
            text = normalize_text(re.sub(r"<[^>]+>", " ", path.read_text(encoding="utf-8", errors="replace")))
            chunk = chunk_from_text(
                f"doc-{name}-0",
                "document",
                text,
                {"source": name, "topic": "html_reference"}
            )
            if chunk:
                chunks.append(chunk)
            continue

        if suffix in {".txt", ".md", ""}:
            text = normalize_text(path.read_text(encoding="utf-8", errors="replace"))
            chunk = chunk_from_text(
                f"doc-{name}-0",
                "document",
                text,
                {"source": name, "topic": "text_reference"}
            )
            if chunk:
                chunks.append(chunk)

    return chunks


def write_json(path: Path, payload):
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def write_frontend_stub():
    stub = {
        "meta": {
            "entries": 0,
            "crop_profiles": 0,
            "intent_examples": 0,
            "mode": "frontend-fallback-lightweight",
        },
        "entries": [],
        "cropProfiles": [],
        "intentExamples": [],
    }
    output = APP_DIR / "chatbot-imported-data.js"
    output.write_text(
        "window.KISAN_CHATBOT_IMPORTED = " + json.dumps(stub, ensure_ascii=False) + ";\n",
        encoding="utf-8",
    )


def main():
    payload = build_payload()
    extra_document_chunks = build_extra_document_chunks()
    search_chunks = build_search_chunks(payload) + extra_document_chunks
    payload["manifest"]["document_chunks"] = len(extra_document_chunks)
    payload["manifest"]["search_chunks"] = len(search_chunks)
    OUTPUT_DIR.mkdir(exist_ok=True)

    write_json(OUTPUT_DIR / "manifest.json", payload["manifest"])
    write_json(OUTPUT_DIR / "qa-primary.json", payload["qa_primary"])
    write_json(OUTPUT_DIR / "qa-secondary.json", payload["qa_secondary"])
    write_json(OUTPUT_DIR / "crop-profiles.json", payload["crop_profiles"])
    write_json(OUTPUT_DIR / "intent-examples.json", payload["intent_examples"])
    write_json(OUTPUT_DIR / "word-tags.json", payload["word_tags"])
    write_json(OUTPUT_DIR / "search-chunks.json", search_chunks)
    write_frontend_stub()

    print("Wrote backend chatbot data to:")
    print(f"  - {OUTPUT_DIR / 'manifest.json'}")
    print(f"  - {OUTPUT_DIR / 'qa-primary.json'} ({len(payload['qa_primary'])} records)")
    print(f"  - {OUTPUT_DIR / 'qa-secondary.json'} ({len(payload['qa_secondary'])} records)")
    print(f"  - {OUTPUT_DIR / 'crop-profiles.json'} ({len(payload['crop_profiles'])} records)")
    print(f"  - {OUTPUT_DIR / 'intent-examples.json'} ({len(payload['intent_examples'])} records)")
    print(f"  - {OUTPUT_DIR / 'word-tags.json'} ({len(payload['word_tags'])} records)")
    print(f"  - {OUTPUT_DIR / 'search-chunks.json'} ({len(search_chunks)} records)")
    print(f"Updated frontend stub: {APP_DIR / 'chatbot-imported-data.js'}")


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(f"Build failed: {error}", file=sys.stderr)
        raise
