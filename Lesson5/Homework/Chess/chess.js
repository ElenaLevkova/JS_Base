'use strict';

let chessBody = document.querySelector('body');

let letters = document.createElement('div');
chessBody.appendChild(letters);
letters.classList.add('ch-letters');
let chessLetters = document.querySelector('.ch-letters');

let content = document.createElement('div');
chessBody.appendChild(content);
content.classList.add('ch-content');
let chessContent = document.querySelector('.ch-content');

let numbers = document.createElement('div');
chessContent.appendChild(numbers);
numbers.classList.add('ch-numbers');
let chessNumbers = document.querySelector('.ch-numbers');

for (let i=0; i<8; i++) {
    let letter = document.createElement('div');
    chessLetters.appendChild(letter);
    letter.classList.add('ch-letter');
    letter.textContent = String.fromCharCode(65 + i);
};

for (let i=1; i<=8; i++) {
    let number = document.createElement('div');
    chessNumbers.appendChild(number);
    number.classList.add('ch-number');
    number.textContent = i
};

let wrap = document.createElement('div');
chessContent.appendChild(wrap);
wrap.classList.add('ch-wrap');

let chessWrap = document.querySelector('.ch-wrap');

for (let i=0; i<8; i++) {
    for (let j=0; j<8; j++) {
        let item = document.createElement('div');
        chessWrap.appendChild(item);
        item.classList.add('ch-item');
        let color = (i % 2) ? ((j + 1) % 2) : (j % 2);
        if (color) item.classList.add('ch-black');
        item.setAttribute('i', i);
        item.setAttribute('j', j);
    };
};

const figure = (chess, color, i, j) => {
    let fig = document.querySelector(`[i = "${i}" ][j = "${j}" ]`);
    fig.textContent = chess;
    fig.classList.add(color);
};

for (let i=0; i<8; i++) {
    figure('П','fig_black',1,i);
    figure('П','fig_white',6,i);
};

figure('Л','fig_black',0,0);
figure('Л','fig_black',0,7);
figure('Л','fig_white',7,0);
figure('Л','fig_white',7,7);

figure('К','fig_black',0,1);
figure('К','fig_black',0,6);
figure('К','fig_white',7,1);
figure('К','fig_white',7,6);

figure('С','fig_black',0,2);
figure('С','fig_black',0,5);
figure('С','fig_white',7,2);
figure('С','fig_white',7,5);

figure('К-ль','fig_black',0,4);
figure('Ф','fig_black',0,3);
figure('К-ль','fig_white',7,4);
figure('Ф','fig_white',7,3);