'use strict';
//////////1/////////////

console.log('Задание №1');

//const num = parseInt(prompt('Введите число от 0 до 999'));

let transformNumber = (num) => {
    if (num >= 0 & num <= 999) {
        return {units: num%10,
                tens: Math.floor(num%100/10),
                hundreds: Math.floor(num/100)};
    }
    else {console.log('Введите число от 0 до 999');
        return {};
    }
}
console.log(transformNumber(56));


//////////2/////////////

console.log('Задание №2');
//Считаю, что второе задание неотрывно связано от третьего.
//В массиве Корзины удобнее использовать товары из каталога, добавив к ним количество (count) - поля, не содержащегося в каталоге.
//Поэтому отдельно вначале завожу массив каталога, состоящий из объектов Product, затем эти же объекты использую и в корзине.

function Product(name, model, description, size, price) {
    this.name = name;
    this.model = model;
    this.description = description;
    this.size =  size;
    this.price = price;
};
let product_catalog = [
    new Product( 'product1','0001024','qwertyyuui', 'S', 10 ),
    new Product( 'product2','001554','fjghfjhgfkh', 'L', 30 ),
    new Product( 'product3','001166334','nbvbhnbmn', 'XL', 20),
    new Product( 'product4','00117774',';i;juijuo', 'XXL', 10 )
];

const cart = [
    {item : product_catalog[0], count: 2},
    {item : product_catalog[1], count: 3},
    {item : product_catalog[2], count: 5},
    {item : product_catalog[3], count: 1}
];

function countBasketPrice(_cart) {
    return _cart.reduce((accum, el) => accum + el.item.price * el.count, 0);
}

//Вариант простого массива объектов - но посчитала так не правильно, т.к. name и price относятся непосредственно к товару, а count именно к корзине.
// const cart = [
//     {name: 'product1', price: 10, count: 2},
//     {name: 'product2', price: 30, count: 3},
//     {name: 'product3', price: 20, count: 5},
//     {name: 'product4', price: 10, count: 1}
// ];
// function countBasketPrice(_cart) {
//     return _cart.reduce((accum, el) => accum + el.price * el.count, 0);
// }


console.log(`Стоимость корзины = ${countBasketPrice(cart)}`);

///////////////////////////////////


