from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

# Настройка базы данных
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Модель для элементов корзины
class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    itemNumber = db.Column(db.String(10), nullable=False)
    title = db.Column(db.String(40), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    size = db.Column(db.String(1), nullable=False)
    price = db.Column(db.Integer, nullable=False)

# Используем контекст приложения для создания базы данных
with app.app_context():
    db.create_all()  # Создаст все таблицы, если они не существуют
    print("Таблицы созданы.")

