from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Database connection
def get_db_connection():
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="root",
        database="inventory_db"
    )
    return conn

# Test Route
@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Flask backend!"})

# Get all inventory items
@app.route('/api/inventory', methods=['GET'])
def get_inventory():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM inventory")
    items = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(items)

# Add a new item
@app.route('/api/inventory', methods=['POST'])
def add_item():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO inventory (name, quantity, price) VALUES (%s, %s, %s)", 
                   (data['name'], data['quantity'], data['price']))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Item added successfully"})

# Delete an item
@app.route('/api/inventory/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM inventory WHERE id=%s", (item_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Item deleted successfully"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)