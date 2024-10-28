from app import db, Product, app

# Создаем контекст приложения
with app.app_context():
    # Создаем таблицы, если они еще не существуют
    db.create_all()

    # Создаем объекты продуктов с необходимыми атрибутами
    products = [
        Product(
            itemNumber='Item 1',
            title='Amazing Black Jacket',
            description='Stylish and comfortable jacket',
            price=100,
            color='red',
            size='M',
            country='Canada',
            image='./images/tile_2.jfif'
        ),
        Product(
            itemNumber='Item 2',
            title='Blue T-shirt',
            description='Comfortable cotton T-shirt',
            price=50,
            color='blue',
            size='S',
            country='England',
            image='./images/tile_3.jfif'
        ),
        Product(
            itemNumber='Item 3',
            title='Black Sneakers',
            description='Trendy black sneakers',
            price=75,
            color='black',
            size='S',
            country='USA',
            image='./images/tile_4.jfif'
        ),
        Product(
            itemNumber='Item 4',
            title='Blue Jeans',
            description='Comfortable denim jeans',
            price=60,
            color='blue',
            size='L',
            country='England',
            image='./images/tile_1.webp'
        ),
    ]

    # Добавляем продукты в сессию базы данных и сохраняем изменения
    db.session.bulk_save_objects(products)
    db.session.commit()

    print("Данные успешно добавлены!")
