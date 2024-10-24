from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

# Настраиваем Flask-CORS с разрешением всех методов и заголовков
CORS(app, resources={r"/*": {"origins": "*", "allow_headers": "*", "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///bands.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Модель данных для рок-групп
class Band(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    members = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.String(100), nullable=False)
    year_formed = db.Column(db.Integer, nullable=False)

# Создание базы данных
with app.app_context():
    db.create_all()

# Точка входа приложения
@app.route('/')
def home():
    return "Сайт рок-групп"

# CRUD маршруты

# POST-запрос для создания новой группы
@app.route('/bands', methods=['POST'])
def create_band():
    data = request.get_json()
    new_band = Band(name=data['name'], members=data['members'], genre=data['genre'], year_formed=data['year_formed'])
    db.session.add(new_band)
    db.session.commit()
    return jsonify({'message': 'Группа добавлена успешно!'}), 201

# GET-запрос для получения всех групп
@app.route('/bands', methods=['GET'])
def get_bands():
    bands = Band.query.all()
    output = []
    for band in bands:
        band_data = {'id': band.id, 'name': band.name, 'members': band.members, 'genre': band.genre, 'year_formed': band.year_formed}
        output.append(band_data)
    return jsonify({'bands': output})

# GET-запрос для получения конкретной группы
@app.route('/bands/<id>', methods=['GET'])
def get_band(id):
    band = Band.query.get_or_404(id)
    return jsonify({'id': band.id, 'name': band.name, 'members': band.members, 'genre': band.genre, 'year_formed': band.year_formed})

# PUT-запрос для обновления группы
@app.route('/bands/<id>', methods=['PUT'])
def update_band(id):
    band = Band.query.get_or_404(id)
    data = request.get_json()
    band.name = data['name']
    band.members = data['members']
    band.genre = data['genre']
    band.year_formed = data['year_formed']
    db.session.commit()
    return jsonify({'message': 'Данные группы обновлены успешно!'})

# DELETE-запрос для удаления группы
@app.route('/bands/<id>', methods=['DELETE'])
def delete_band(id):
    band = Band.query.get_or_404(id)
    db.session.delete(band)
    db.session.commit()
    return jsonify({'message': 'Группа удалена успешно!'})

if __name__ == '__main__':
    app.run(debug=True)