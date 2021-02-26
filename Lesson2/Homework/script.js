'use strict';
//////////1/////////////
{
    console.log('Задание №1');
    var a = 1, b = 1, c, d;
    c = ++a; console.log(c);           // 2 - возвращает результат после инкремента, a = 2
    d = b++; console.log(d);           // 1 - возвращает результат до инкремента, b = 2
    c = (2+ ++a); console.log(c);      // 5 - до данной операции a уже было 2, после ++a стало 3
    d = (2+ b++); console.log(d);      // 4 - до данной операции b было 2, и в момента суммы еще 2
    console.log(a);                    // 3 - a = 3, т.к было 2 оператора инкремента
    console.log(b);                    // 3 - b = 3, т.к было 2 оператора инкремента
}


// ////////2//////////
{
    var a = 2;
    var x = 1 + (a *= 2);   //x = 5, т.к a *= 2 a = a * 2
}


////////3/////////
{
     let a = Math.floor(Math.random() * 100);
    //console.log(a);
    a *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
     let b = Math.floor(Math.random() * 100);
    //console.log(b);
    b *= Math.floor(Math.random()*2) == 1 ? 1 : -1;

    // console.log(a);
    //console.log(b);
    console.log('Задание №3');
    if (a >= 0 & b >= 0) console.log('Разность чисел = ' + (a - b));
    else if (a < 0 & b < 0) console.log('Произведение чисел = ' + (a * b));
    else if (a > 0 & b < 0 | a < 0 & b > 0) console.log('Сумма чисел = ' + (a + b));
}

///////4///////////
{
    console.log('Задание №4');
    const min = 1;
    const max = 15;

    function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let a = +getRandomInRange(min, max)
    //console.log(a);

    ///реализация вывода через рекурсивную функцию/////
    function printNumbers(a) {
        if (a === max) return max;
        return a + ', ' + printNumbers(a + 1);

    }

    console.log(printNumbers(a));

    ///реализация вывода через switch - вывод в строку/////
    function printNumbersSwitch1(a) {
        //console.log(a);
        switch (a) {
            case 1 :
                console.log('1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
                break;
            case 2 :
                console.log('2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
                break;
            case 3 :
                console.log('3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
                break;
            case 4 :
                console.log('4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
                break;
            case 5 :
                console.log('5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
                break;
            case 6 :
                console.log('6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
                break;
            case 7 :
                console.log('7, 8, 9, 10, 11, 12, 13, 14, 15');
                break;
            case 8 :
                console.log('8, 9, 10, 11, 12, 13, 14, 15');
                break;
            case 9 :
                console.log('9, 10, 11, 12, 13, 14, 15');
                break;
            case 10 :
                console.log('10, 11, 12, 13, 14, 15');
                break;
            case 11 :
                console.log('11, 12, 13, 14, 15');
                break;
            case 12 :
                console.log('12, 13, 14, 15');
                break;
            case 13 :
                console.log('13, 14, 15');
                break;
            case 14 :
                console.log('14, 15');
                break;
            case 15 :
                console.log('15');
                break;
            default:
                console.log('число не задано');
        }
    }

    printNumbersSwitch1(a);

///реализация вывода через switch - вывод в столбец/////
    function printNumbersSwitch2(a) {
        //console.log(a);
        switch (a) {
            case 1 :
                console.log(a++);
            case 2 :
                console.log(a++);
            case 3 :
                console.log(a++);
            case 4 :
                console.log(a++);
            case 5 :
                console.log(a++);
            case 6 :
                console.log(a++);
            case 7 :
                console.log(a++);
            case 8 :
                console.log(a++);
            case 9 :
                console.log(a++);
            case 10 :
                console.log(a++);
            case 11 :
                console.log(a++);
            case 12 :
                console.log(a++);
            case 13 :
                console.log(a++);
            case 14 :
                console.log(a++);
            case 15 :
                console.log(a++);
                break;
            default:
                console.log('число не задано');
        }
    }

    printNumbersSwitch2(a);
}

////////////////5/////////////////
{
    console.log('Задание №5');
    let a = Math.floor(Math.random() * 100);
    let b = Math.floor(Math.random() * 100);
    // console.log(a);
    // console.log(b);

    function getSum(a, b) {
        return a + b;
    }
    console.log('Сумма чисел = ' + getSum(a, b));

    function getDif(a, b) {
        return (a > b) ?  (a - b) : (b - a);
    }
    console.log('Разность чисел = ' + getDif(a, b));

    function getMultiply(a, b) {
        return a * b;
    }
    console.log('Произведение чисел = ' + getMultiply(a, b));

    function getDiv(a, b) {
        return  Math.round((a > b) ?  (a / b) : (b / a));
    }
    console.log('Частное чисел = ' + getDiv(a, b));



//////////////6///////////

    console.log('Задание №6');
    const operation = "/";
    function mathOperation(a, b, operation)  {
        switch (operation) {
            case '+' : console.log('Сумма чисел = ' + getSum(a, b)); break;
            case '-' : console.log('Разность чисел = ' + getDif(a, b)); break;
            case '*' : console.log('Произведение чисел = ' + getMultiply(a, b)); break;
            case '/' : console.log('Частное чисел = ' + getDiv(a, b)); break;
            default: console.log('Операция не определена')
         }
     }
    mathOperation(a, b, operation);


}

////////7///////////
//{
    //////Сравнение null и 0//////
//     null > 0; // false
//     null == 0; // false
//     null >= 0; // true
// Если null < 0 принимает значение false, то null >= 0 принимает значение true
// }

//////////////8///////////
{
    console.log('Задание №8');
    let val = Math.floor(Math.random() * 10);
    val *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    const pow = 3;
    function power(val, pow)  {
        if (pow===1) return val;
        if (val===0) return 1;
        return  val *= power(val, pow-1);
    }
    console.log(val + ' в степени ' + pow + ' = ' + power(val, pow));


}