from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

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

@app.route('/api/products', methods=['GET'])
def get_products():
    query = Product.query

    color = request.args.get('color')
    size = request.args.get('size')
    country = request.args.get('country')
    search = request.args.get('search')
    print('filters', color, size, country, search)

    # Применение фильтров, если они переданы
    if color and color != 'All Colors':
        print('color', color)
        query = query.filter(Product.color == color)
    if size and size != 'All Sizes':
        print('size', size)
        query = query.filter(Product.size == size)
    if country and country != 'All Countries':
        print('country', country)
        query = query.filter(Product.country == country)
    if search:
        print('search', search)
        query = query.filter(Product.title.ilike(f"%{search}%"))

    products = query.all()

    # Преобразование данных в формат JSON
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

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
