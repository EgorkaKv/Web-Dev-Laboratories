from app import db, Product, app

# Создаем контекст приложения
with app.app_context():
    # Создаем таблицы, если они еще не существуют
    db.create_all()

    # Создаем объекты продуктов с необходимыми атрибутами
    products = [
        # Продукт с двумя вариантами размера: M и S
        Product(
            itemNumber='Item 1',
            title='Amazing Black Jacket',
            description='Stylish and comfortable jacket',
            price=100,
            color='red',
            size='S',
            country='Canada',
            image='./images/tile_2.jfif',
            max_quantity=10
        ),
        Product(
            itemNumber='Item 5',
            title='Amazing Black Jacket',
            description='Stylish and comfortable jacket',
            price=100,
            color='red',
            size='L',
            country='Canada',
            image='./images/tile_2.jfif',
            max_quantity=10
        ),
        # Продукт с двумя вариантами размера: S и L
        Product(
            itemNumber='Item 2',
            title='Blue T-shirt',
            description='Comfortable cotton T-shirt',
            price=50,
            color='blue',
            size='S',
            country='England',
            image='./images/tile_3.jfif',
            max_quantity=15
        ),
        Product(
            itemNumber='Item 6',
            title='Blue T-shirt',
            description='Comfortable cotton T-shirt',
            price=50,
            color='blue',
            size='L',
            country='England',
            image='./images/tile_3.jfif',
            max_quantity=15
        ),
        # Продукт с двумя вариантами размера: S и M
        Product(
            itemNumber='Item 3',
            title='Black Sneakers',
            description='Trendy black sneakers',
            price=75,
            color='black',
            size='S',
            country='USA',
            image='./images/tile_4.jfif',
            max_quantity=5
        ),
        Product(
            itemNumber='Item 7',
            title='Black Sneakers',
            description='Trendy black sneakers',
            price=75,
            color='black',
            size='L',
            country='USA',
            image='./images/tile_4.jfif',
            max_quantity=5
        ),
        # Продукт с двумя вариантами размера: L и M
        Product(
            itemNumber='Item 4',
            title='Blue Jeans',
            description='Comfortable denim jeans',
            price=60,
            color='blue',
            size='S',
            country='England',
            image='./images/tile_1.webp',
            max_quantity=12
        ),
        Product(
            itemNumber='Item 8',
            title='Blue Jeans',
            description='Comfortable denim jeans',
            price=60,
            color='blue',
            size='L',
            country='England',
            image='./images/tile_1.webp',
            max_quantity=12
        ),
    ]

    # Добавляем продукты в сессию базы данных и сохраняем изменения
    db.session.bulk_save_objects(products)
    db.session.commit()

    print("Данные успешно добавлены!")

