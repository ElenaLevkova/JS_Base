'use strict';
function Product(name, model, description, size, price) {
    this.name = name;
    this.model = model;
    this.description = description;
    this.size =  size;
    this.price = price;
    this.getText = () => {
        return (`Наименование товара: ${this.name}, модель: ${this.model}, размер: ${this.size}, цена: ${this.price}`)
    };
    this.render = () => {
        let item = document.createElement('div');
        item.textContent = this.getText();
        return item;
    };
};

const product_catalog = {
    goods: [
        new Product( 'product1','0001024','qwertyyuui', 'S', 10 ),
        new Product( 'product2','001554','fjghfjhgfkh', 'L', 30 ),
        new Product( 'product3','001166334','nbvbhnbmn', 'XL', 20),
        new Product( 'product4','00117774',';i;juijuo', 'XXL', 10 ),
        new Product( 'product5','00118884','qqqqqq', 'XS', 15 )
    ],
    render() {
        let item = document.createElement('div');
        item.textContent = "Каталог продуктов:";
        this.goods.forEach(el => item.appendChild(el.render()));
        return item;
    }
};

const cart = {
    goods_in_cart: [
        {item : product_catalog.goods[0], count: 2},
        {item : product_catalog.goods[1], count: 3},
        {item : product_catalog.goods[2], count: 5},
        {item : product_catalog.goods[3], count: 1},
        {item : product_catalog.goods[4], count: 2}
    ],
    countBasketPrice() {
        return this.goods_in_cart.reduce((accum, el) => accum + el.item.price * el.count, 0);
    },
    countBasket() {
        return this.goods_in_cart.length;
    },
    render() {
        let item = document.createElement('div');
        item.textContent = (this.countBasketPrice() > 0) ? (`В корзине: ${this.countBasket()} товаров на сумму ${this.countBasketPrice()} рублей `) : ('Корзина пуста');
        return item;
    }
};

let renderGoods= () => {
    let element = document.getElementById('catalog');
    element.classList.add('catalog');
    element.appendChild(product_catalog.render());
};

let renderCart= () => {
    let element = document.getElementById('cart');
    element.classList.add('cart');
    element.appendChild(cart.render());
};

renderGoods();
renderCart();