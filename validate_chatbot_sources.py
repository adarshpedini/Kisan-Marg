import csv
import json
from collections import Counter
from pathlib import Path


APP_DIR = Path(__file__).resolve().parent
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


def load_plan():
    path = APP_DIR / "chatbot-source-plan.json"
    return json.loads(path.read_text(encoding="utf-8"))


def read_csv(path: Path):
    with path.open(newline="", encoding="utf-8-sig") as handle:
        return list(csv.DictReader(handle))


def summarize_rows(rows):
    return {
        "rows": len(rows),
        "columns": list(rows[0].keys()) if rows else [],
    }


def validate_qa_file(path: Path):
    rows = read_csv(path)
    summary = summarize_rows(rows)
    intents = Counter((row.get("intent") or "").strip() for row in rows)
    unsupported = sorted(intent for intent in intents if intent and intent not in SUPPORTED_INTENTS)
    missing_question = sum(1 for row in rows if not (row.get("question") or "").strip())
    missing_answer = sum(1 for row in rows if not (row.get("answer") or "").strip())
    return {
        **summary,
        "intent_counts": intents,
        "unsupported_intents": unsupported,
        "missing_question": missing_question,
        "missing_answer": missing_answer,
    }


def validate_intent_examples(path: Path):
    rows = read_csv(path)
    summary = summarize_rows(rows)
    intents = Counter((row.get("intent") or "").strip() for row in rows)
    missing_query = sum(1 for row in rows if not (row.get("query") or "").strip())
    return {
        **summary,
        "intent_counts": intents,
        "missing_query": missing_query,
    }


def validate_crop_profiles(path: Path):
    rows = read_csv(path)
    summary = summarize_rows(rows)
    duplicate_rainfall_irrigation = sum(
        1 for row in rows
        if (row.get("rainfall") or "").strip() and (row.get("rainfall") or "").strip() == (row.get("irrigation") or "").strip()
    )
    state_focus = Counter((row.get("state_focus") or "").strip() for row in rows)
    return {
        **summary,
        "duplicate_rainfall_irrigation": duplicate_rainfall_irrigation,
        "state_focus_counts": state_focus,
    }


def validate_word_tags(path: Path):
    rows = read_csv(path)
    summary = summarize_rows(rows)
    labels = Counter((row.get("label") or "").strip() for row in rows)
    return {
        **summary,
        "label_counts": labels,
    }


def main():
    plan = load_plan()
    print("Chatbot source validation\n")
    for group in ("primary_sources", "secondary_sources", "hold_sources"):
        items = plan.get(group, [])
        if not items:
            continue
        print(f"{group}:")
        for item in items:
            path = Path(item["file"])
            if not path.exists():
                print(f"  - {path.name}: MISSING")
                continue
            source_type = item.get("type")
            if source_type == "crop_profiles":
                result = validate_crop_profiles(path)
            elif source_type == "intent_examples":
                result = validate_intent_examples(path)
            elif source_type == "word_tags":
                result = validate_word_tags(path)
            else:
                result = validate_qa_file(path)
            print(f"  - {path.name}: {result['rows']} rows")
            if "unsupported_intents" in result and result["unsupported_intents"]:
                print(f"    unsupported intents: {', '.join(result['unsupported_intents'])}")
            if result.get("missing_question"):
                print(f"    missing questions: {result['missing_question']}")
            if result.get("missing_answer"):
                print(f"    missing answers: {result['missing_answer']}")
            if result.get("missing_query"):
                print(f"    missing queries: {result['missing_query']}")
            if "duplicate_rainfall_irrigation" in result:
                print(f"    rainfall==irrigation rows: {result['duplicate_rainfall_irrigation']}")
            if "state_focus_counts" in result:
                counts = ", ".join(f"{k or 'blank'}={v}" for k, v in result["state_focus_counts"].items())
                print(f"    state_focus: {counts}")
            if "label_counts" in result:
                counts = ", ".join(f"{k}={v}" for k, v in result["label_counts"].most_common())
                print(f"    labels: {counts}")
        print()


if __name__ == "__main__":
    main()
