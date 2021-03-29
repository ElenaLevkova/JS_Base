'use strict';
function Product(id_product, product_name, model, description, size, price, imgPreview, imgFull) {
    this.id_product = id_product;
    this.product_name = product_name;
    this.model = model;
    this.description = description;
    this.size =  size;
    this.price = price;
    this.imgPreview = imgPreview;
    this.imgFull = imgFull;
    this.render = () => {
        return `<div class="catalog__item">
                    <img class="catalog__img" src=${this.imgPreview} data-full_image_url=${this.imgFull} alt="Картинка1">
                    <div class="catalog__heading"><b>Наименование</b>: ${this.product_name}</div>
                    <div class="catalog__price"><b>Цена за шт.</b>: ${this.price}</div>
                    <button class="catalog__button" data-id_product="${this.id_product}">
                            <img  class="catalog__button_img" src="img/catalog-cart.svg" alt="cart">Add to Cart</button>

                </div>`;
    }
};

const product_catalog = {
    goods: [
        new Product( '1','product1','0001024','qwertyyuui', 'S', 10, 'img/min/cat-1.jpg', 'img/max/cat-1' ),
        new Product( '2','product2','001554','fjghfjhgfkh', 'L', 30 , 'img/min/cat-2.jpg', 'img/max/cat-2'),
        new Product( '3','product3','001166334','nbvbhnbmn', 'XL', 20, 'img/min/cat-3.jpg', 'img/max/cat-3'),
        new Product( '4','product4','00117774',';i;juijuo', 'XXL', 10 , 'img/min/cat-4.jpg', 'img/max/cat-4'),
        new Product( '5','product5','00118884','qqqqqq', 'XS', 15 , 'img/min/cat-5.jpg', 'img/max/cat-5'),
        new Product( '6','product6','0099955','eeeeeee', 'XS', 25 , 'img/min/cat-6.jpg', 'img/max/cat-6')
    ],
    settings: {
        previewSelector: '.galleryPreviewsContainer',
        openedImageWrapperClass: 'galleryWrapper',
        openedImageClass: 'galleryWrapper__image',
        openedImageScreenClass: 'galleryWrapper__screen',
        openedImageCloseBtnClass: 'galleryWrapper__close',
        openedImageCloseBtnSrc: 'img/close.png',
        num: 1,
        fullIMG:''
    },

    render() {
        let catalog_element = document.getElementById('catalog');
        catalog_element.classList.add('catalog');

        let item1 = document.createElement('h2');
        item1.textContent = "Каталог товаров:";
        item1.classList.add('catalog_heading');
        catalog_element.appendChild(item1);

        let item = document.createElement('div');
        item.classList.add('catalog_items');

        this.goods.forEach(el => item.insertAdjacentHTML('beforeend', el.render()));
        catalog_element.appendChild(item);
        this.initClick();
    },

    initClick() {
        document.querySelector('body').addEventListener('click', (event) => {
                this.ClickHandler(event);
        });

    },

    ClickHandler(event) {
        if (event.target.className === 'catalog__button')  this.ClickHandlerAddToCart(event)
        if (event.target.className === 'catalog__img')  this.ClickHandlerIMG(event)
        else {return};
    },

    ClickHandlerAddToCart(event) {
        //проверка в массиве корзины, нет ли такого уже товара
        let goodNew = cart.goods_in_cart.find(el => el.item.id_product === event.target.dataset.id_product);
        if (goodNew === undefined) cart.goods_in_cart.push({item:this.goods.find(item => item.id_product === event.target.dataset.id_product), quantity: 1}) //Добавляем новый товар в массив корзины
        else {
            let index = cart.goods_in_cart.indexOf(goodNew);
            if (~index) {
                cart.goods_in_cart[index].quantity += 1;
            }
        }
        cart.init();
    },

    ClickHandlerIMG(event) {
        //клик на картинке
        console.log(event.target.dataset.full_image_url)
        this.settings.fullIMG = event.target.dataset.full_image_url;
        this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`).src = this.settings.fullIMG  + this.settings.num + '.jpg';//формируем имя файла фулл
    },

    getScreenContainer() {
        const galleryWrapperElement = document
            .querySelector(`.${this.settings.openedImageWrapperClass}`);
        //проверка на необходимость создания разметки
        if (galleryWrapperElement) return galleryWrapperElement;
        console.log(this.settings.openedImageWrapperClass)
        return this.createScreenContainer();
    },

    createScreenContainer() {
        const galleryWrapperElement = document.createElement('div');
        galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

        const galleryScreenElement = document.createElement('div');
        galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
        galleryWrapperElement.appendChild(galleryScreenElement);

        const closeImageElement = new Image();
        closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
        closeImageElement.src = this.settings.openedImageCloseBtnSrc;
        closeImageElement.addEventListener('click', () => this.close());
        galleryWrapperElement.appendChild(closeImageElement);

        const image = new Image();
        image.classList.add(this.settings.openedImageClass);
        galleryWrapperElement.appendChild(image);
        //добавляем кнопки для пролистывания
        galleryScreenElement.insertAdjacentHTML('beforeend', `<div class="gallery_button"> <input type="button" class="gallery_left" value="Назад" >
                                                         <input type="button" class="gallery_right" value="Вперёд" ></div>`)

        document.body.appendChild(galleryWrapperElement);
        const galleryButton =  document.querySelector('.gallery_button');
        galleryButton.addEventListener('click', (event) =>  this.slide(event));

        return galleryWrapperElement;
    },

    slide(event) {
        //отлавливаем клик на кнопках пролистывания
        if (event.target.getAttribute('class') === 'gallery_left') {
            this.fLeft()
        }
        if (event.target.getAttribute('class') === 'gallery_right') {
            this.fRight()
        }
        else {
            return
        };
    },

    fLeft() {
        console.log('left');
        this.settings.num--; // уменьшаем
        //листаем до 3-х фото
        if (this.settings.num <= 0) this.settings.num = 3;
        console.log(this.settings.fullIMG + this.settings.num + '.jpg')
       return  this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`).src = this.settings.fullIMG + this.settings.num + '.jpg'; //собираем имя файла

    },
    fRight() {
        console.log('right');
        this.settings.num++; // увеличиваем
        //листаем до 3-х фото
        if (this.settings.num > 3) this.settings.num = 1;
        console.log(this.settings.fullIMG + this.settings.num + '.jpg')
       return  this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`).src = this.settings.fullIMG + this.settings.num + '.jpg'; //собираем имя файла
    },

    close() {
        document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
    },
};

product_catalog.render();

const cartItem_render = (good) => {
        return `<div class="good">
                    <div><b>Наименование</b>: ${good.item.product_name}</div>
                    <div><b>Цена за шт.</b>: ${good.item.price}</div>
                    <div><b>Количество</b>: ${good.quantity}</div>
                    <div><b>Стоимость</b>: ${good.quantity * good.item.price}</div>
                </div>`;
}

const cart = {
    cartListBlock: null,
    cartBlock: null,
    cartButton: null,
    goods_in_cart: [
        // {item : product_catalog.goods[0], quantity: 1},
        // {item : product_catalog.goods[1], quantity: 1}
    ],
    init() {
        //очистка содержимого корзины
       let cartList = document.querySelector('.cart-list');
        if (cartList !== null) cartList.remove();
        //создание корзины
        this.cartBlock = document.querySelector('.cart');
        this.cartListBlock = document.createElement('div');
        this.cartBlock.appendChild(this.cartListBlock);
        this.cartListBlock.classList.add('cart-list');

        this.cartButton = document.querySelector('.cart-btn');
        this.cartButton.addEventListener('click', this.clearCart.bind(this));

        this.render();
    },
    render() {
        if (this.goods_in_cart.length) {
            this.goods_in_cart.forEach(good => {
                this.cartListBlock.insertAdjacentHTML('beforeend', cartItem_render(good));
            });
            this.cartListBlock.insertAdjacentHTML('beforeend', `<div class="cart_total">В корзине <b>${this.countCart()}</b> позиций(а) стоимостью <b>${this.countCartPrice()}</b> рублей</div> `);
        } else {
            this.cartListBlock.insertAdjacentHTML('beforeend', `<div class="cart_total">Корзина пуста</div> `);
        }
        console.log('1',cart.goods_in_cart);
    },
    clearCart() {
        this.goods_in_cart = [];
        this.init();
    },
    countCartPrice() {
        return this.goods_in_cart.reduce((accum, el) => accum + el.item.price * el.quantity, 0);
    },
    countCart() {
        return this.goods_in_cart.length;
    }

};

cart.init();



