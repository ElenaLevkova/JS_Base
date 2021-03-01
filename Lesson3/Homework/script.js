'use strict';
//////////1/////////////

console.log('Задание №1');
for (let i = 2; i <= 100; i++) {
    let flag = false;
    for (let j = 2; j <= Math.sqrt(i); j++) {
        if ((i % j) === 0) flag = true;
        }
     if (flag === false) console.log(i);
}


//////////2/////////////

console.log('Задание №2');
let cart = [
        ['product1', 20, 2],
        ['product2', 10, 3],
        ['product3', 10, 5],
        ['product4', 20, 4],
    ];

 function countBasketPrice(_cart) {
//     let result = 0;                                                  //вариант использования цикла
//     for (let i = 0; i < cart.length; i++) {
//         result += cart[i][1]* cart[i][2];
//     }
//     return result;
     return _cart.reduce((accum, el) => accum + el[1] * el[2], 0);      //вариант использования reduce
 }


console.log(`Стоимость корзины = ${countBasketPrice(cart)}`);

//////////3/////////////

console.log('Задание №3');
for(let i=0;i<=9;console.log(i++)){
    // здесь пусто
}

//////////4/////////////

console.log('Задание №4');

   for (let j=1; j<= 20; j++) {
        console.log('x'.repeat(j));
    }



