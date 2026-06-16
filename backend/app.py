from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import re
import os

app = Flask(__name__)
CORS(app)

DB_PATH = os.path.join(os.path.dirname(__file__), "ingredients.json")
with open(DB_PATH, "r", encoding="utf-8") as f:
    DB = json.load(f)

def normalize(text):
    return re.sub(r"\s+", " ", text.lower().strip().strip(".,-"))

def parse_ingredients(raw):
    parts = re.split(r"[,\n]+", raw)
    return [normalize(p) for p in parts if p.strip()]

def match(ingredient, entry_name, entry):
    if ingredient == normalize(entry_name):
        return True
    for alias in entry.get("also_known_as", []):
        if ingredient == normalize(alias):
            return True
    return False

def check(raw_input):
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

        for name, data in DB["comedogenic"].items():
            if match(ingredient, name, data):
                results["comedogenic"].append({
                    "name": ingredient, "matched": name,
                    "rating": data["rating"], "reason": data["reason"],
                })
                found = True
                break

        for name, data in DB["irritants"].items():
            if match(ingredient, name, data):
                results["irritants"].append({
                    "name": ingredient, "matched": name,
                    "severity": data["severity"], "reason": data["reason"],
                })
                found = True
                break

        if not any(r["name"] == ingredient for r in results["comedogenic"] + results["irritants"]):
            for name, data in DB["beneficial"].items():
                if match(ingredient, name, data):
                    results["beneficial"].append({
                        "name": ingredient, "matched": name, "benefit": data["benefit"],
                    })
                    found = True
                    break

        for name, data in DB["low_porosity_heavy"].items():
            if match(ingredient, name, data):
                results["low_porosity_warning"].append({
                    "name": ingredient, "matched": name, "reason": data["reason"],
                })
                found = True
                break

        if not found:
            results["unrecognized"].append(ingredient)

    return results

@app.route("/api/check", methods=["POST"])
def check_ingredients():
    body = request.get_json()
    if not body or "ingredients" not in body:
        return jsonify({"error": "Missing 'ingredients' field"}), 400
    raw = body["ingredients"].strip()
    if not raw:
        return jsonify({"error": "Ingredient list cannot be empty"}), 400
    return jsonify(check(raw))

@app.route("/api/sample", methods=["GET"])
def sample():
    return jsonify({
        "ingredients": "Water, Glycerin, Niacinamide, Sodium Hyaluronate, Coconut Oil, Fragrance, Alcohol Denat, Centella Asiatica Extract, Panthenol, Aloe Barbadensis Leaf Juice, Phenoxyethanol, Shea Butter, Citric Acid"
    })

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "ingredients_loaded": sum(len(v) for v in DB.values())})

if __name__ == "__main__":
    app.run(debug=False, port=5000)
