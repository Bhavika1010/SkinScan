import json
import os
import re

DATA_PATH = os.path.join(os.path.dirname(__file__), "ingredients.json")


def load_database():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def normalize(text):
    return re.sub(r"\s+", " ", text.lower().strip().strip(".,-"))


def parse_ingredients(raw_input):
    parts = re.split(r"[,\n]+", raw_input)
    return [normalize(p) for p in parts if p.strip()]


def match_ingredient(ingredient, db_entry_name, db_entry):
    if ingredient == normalize(db_entry_name):
        return True
    for alias in db_entry.get("also_known_as", []):
        if ingredient == normalize(alias):
            return True
    return False


def check_ingredients(raw_input):
    db = load_database()
    ingredients = parse_ingredients(raw_input)

    results = {
        "total": len(ingredients),
        "comedogenic": [],
        "irritants": [],
        "beneficial": [],
        "low_porosity_warning": [],
        "unrecognized": [],
    }

    for ingredient in ingredients:
        found = False

        for name, data in db["comedogenic"].items():
            if match_ingredient(ingredient, name, data):
                results["comedogenic"].append({
                    "name": ingredient,
                    "matched": name,
                    "rating": data["rating"],
                    "reason": data["reason"],
                })
                found = True
                break

        for name, data in db["irritants"].items():
            if match_ingredient(ingredient, name, data):
                results["irritants"].append({
                    "name": ingredient,
                    "matched": name,
                    "severity": data["severity"],
                    "reason": data["reason"],
                })
                found = True
                break

        if not any(r["name"] == ingredient for r in results["comedogenic"] + results["irritants"]):
            for name, data in db["beneficial"].items():
                if match_ingredient(ingredient, name, data):
                    results["beneficial"].append({
                        "name": ingredient,
                        "matched": name,
                        "benefit": data["benefit"],
                    })
                    found = True
                    break

        for name, data in db["low_porosity_heavy"].items():
            if match_ingredient(ingredient, name, data):
                already = any(r["name"] == ingredient for r in results["low_porosity_warning"])
                if not already:
                    results["low_porosity_warning"].append({
                        "name": ingredient,
                        "matched": name,
                        "reason": data["reason"],
                    })
                found = True
                break

        if not found:
            results["unrecognized"].append(ingredient)

    return results
