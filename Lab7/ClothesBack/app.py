from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import jwt
import os

app = Flask(__name__)
CORS(app)

# Настройка базы данных и секретного ключа
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'mysecretkey')  # Задайте свой секретный ключ для JWT
db = SQLAlchemy(app)

# Модель для продукта
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    itemNumber = db.Column(db.String(10), nullable=False)
    title = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    color = db.Column(db.String(25), nullable=False)
    size = db.Column(db.String(1), nullable=False)
    country = db.Column(db.String(25), nullable=False)
    image = db.Column(db.String(50), nullable=False)

# Модель для пользователя
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)  # Хэшированный пароль
    nonpassword = db.Column(db.String(200), nullable=False)  # Не хэшированный пароль

@app.route('/api/users', methods=['GET'])
def get_users():
    query = User.query
    users = query.all()
    users_list = [
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "password": user.nonpassword
        } for user in users
    ]
    return jsonify(users_list)

# Регистрация нового пользователя
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')  # Хеширование пароля
    new_user = User(username=data['username'], email=data['email'], password=hashed_password, nonpassword=data['password'])

    query = User.query
    users = query.all()
    password = [user.nonpassword for user in users]
    names = [user.username for user in users]
    emails = [user.email for user in users]
    print()

    print(data['username'], data['email'])
    print(names, emails)

    print(password)
    print(data['password'])


    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except:
        return jsonify({"message": "User with this email or username already exists"}), 409

# Авторизация пользователя и генерация JWT
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    print('login')
    query = User.query
    users = query.all()
    password = [user.nonpassword for user in users]
    names = [user.username for user in users]
    emails = [user.email for user in users]
    print()

    print(data['email'])
    print(emails)

    print(password)
    print(data['password'])

    if user and check_password_hash(user.password, data['password']):
        token = jwt.encode(
            {'user_id': user.id, 'exp': datetime.utcnow() + timedelta(hours=1)},  # Токен будет действителен 1 час
            app.config['SECRET_KEY'],
            algorithm="HS256"
        )
        return jsonify({'token': token})
    else:
        return jsonify({"message": "Invalid credentials"}), 401

# Декоратор для защиты маршрутов с использованием JWT
from functools import wraps

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({"message": "Token is missing"}), 403
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.get(data['user_id'])
        except:
            return jsonify({"message": "Token is invalid or expired"}), 403

        return f(current_user, *args, **kwargs)
    return decorated

# Пример защищенного маршрута для получения информации о продуктах
@app.route('/api/products', methods=['GET'])
def get_products():
    query = Product.query
    color = request.args.get('color')
    size = request.args.get('size')
    country = request.args.get('country')
    search = request.args.get('search')

    # Применение фильтров, если они переданы
    if color and color != 'All Colors':
        query = query.filter(Product.color == color)
    if size and size != 'All Sizes':
        query = query.filter(Product.size == size)
    if country and country != 'All Countries':
        query = query.filter(Product.country == country)
    if search:
        query = query.filter(Product.title.ilike(f"%{search}%"))

    products = query.all()
    products_list = [
        {
            "itemNumber": product.itemNumber,
            "title": product.title,
            "description": product.description,
            "price": product.price,
            "color": product.color,
            "size": product.size,
            "country": product.country,
            "image": product.image
        } for product in products
    ]
    return jsonify(products_list)

# Маршрут для выхода из аккаунта (очистка токена)
@app.route('/api/logout', methods=['POST'])
def logout():
    response = make_response({"message": "Logged out"})
    response.headers['Authorization'] = ''
    return response, 200

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)

