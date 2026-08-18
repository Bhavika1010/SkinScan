from flask import Flask, request, jsonify
from flask_cors import CORS

from checker import check_ingredients, load_database

app = Flask(__name__)
CORS(app)


@app.route("/api/check", methods=["POST"])
def check_ingredients_route():
    body = request.get_json()
    if not body or "ingredients" not in body:
        return jsonify({"error": "Missing 'ingredients' field"}), 400
    raw = body["ingredients"].strip()
    if not raw:
        return jsonify({"error": "Ingredient list cannot be empty"}), 400
    return jsonify(check_ingredients(raw))


@app.route("/api/sample", methods=["GET"])
def sample():
    return jsonify({
        "ingredients": "Water, Glycerin, Niacinamide, Sodium Hyaluronate, Coconut Oil, Fragrance, Alcohol Denat, Centella Asiatica Extract, Panthenol, Aloe Barbadensis Leaf Juice, Phenoxyethanol, Shea Butter, Citric Acid"
    })


@app.route("/api/health", methods=["GET"])
def health():
    db = load_database()
    return jsonify({"status": "ok", "ingredients_loaded": sum(len(v) for v in db.values())})


if __name__ == "__main__":
    app.run(debug=False, port=5000)
