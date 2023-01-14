import mysql.connector
from flask import Flask, jsonify, request
from flask_cors import CORS

users = mysql.connector.connect(
  host="localhost",
  user="root",
  password="password",
  database="UsersDB"
)

app = Flask(__name__)
cors = CORS(app)
app.config['JSON_SORT_KEYS'] = False

@app.route('/users', methods=['GET'])
def get_users():
  cursor = users.cursor()
  cursor.execute("SELECT * FROM users")
  all_users = cursor.fetchall()

  users_arr = list()
  for user in all_users:
    users_arr.append({
      'id': user[0],
      'name': user[1],
      'email': user[2]
    })
  return jsonify(users_arr)

@app.route('/users/<int:id>', methods=['GET'])
def get_users_by_id(id):
  cursor = users.cursor()
  cursor.execute("SELECT * FROM users WHERE id = %s", (id,))
  user_by_id = cursor.fetchone()
  return jsonify({
    'id': user_by_id[0],
    'name': user_by_id[1],
    'email': user_by_id[2]
  })

@app.route('/users', methods=['POST'])
def create_user():
  data = request.get_json()
  cursor = users.cursor()
  cursor.execute("INSERT INTO users (name, email) VALUES (%s, %s)", (data['name'], data['email']))
  users.commit()
  return jsonify(data)

@app.route('/users/<int:id>', methods=['PUT'])
def edit_user_by_id(id):
  data = request.get_json()
  cursor = users.cursor()
  cursor.execute("UPDATE users SET name = %s, email = %s WHERE id = %s", (data['name'], data['email'], id))
  users.commit()
  return jsonify(data)

@app.route('/users/<int:id>', methods=['DELETE'])
def remove_user(id):
  cursor = users.cursor()
  cursor.execute("DELETE FROM users WHERE id = %s", (id,))
  users.commit()
  return jsonify({
    'id': id
  })

app.run(port=3001, host='localhost', debug=True)