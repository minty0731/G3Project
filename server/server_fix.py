from flask import Flask, request, jsonify
from .db import UserRepository
from .models.account import Diner, ShopOwner

app = Flask(__name__)
user_repo = UserRepository()


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    user_type = data.get('user_type')

    if user_type == 'diner':
        user = Diner(
            username=data['username'],
            password=data['password'],
            full_name=data['full_name'],
            email=data['email'],
            birth_year=data['birth_year'],
            user_type=user_type,
            favorite_restaurants=[],
            phone=data['phone']
        )
    elif user_type == 'shop_owner':
        user = ShopOwner(
            username=data['username'],
            password=data['password'],
            full_name=data['full_name'],
            email=data['email'],
            birth_year=data['birth_year'],
            user_type=user_type,
            food_list=[],
            restaurant_phone=data['restaurant_phone']
        )
    else:
        return jsonify({'error': 'Invalid user type'}), 400

    user_id = user_repo.create_user(user)
    return jsonify({'user_id': user_id}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = user_repo.get_user_by_username(username)
    if not user or user.password != password:
        return jsonify({'error': 'Invalid username or password'}), 401

    return jsonify({'user_id': str(user._id), 'user_type': user.user_type}), 200


if __name__ == '__main__':
    app.run(debug=True)
