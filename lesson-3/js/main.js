const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class ProductsList {
  constructor(container = ".products") {
    this.container = container;
    this.goods = []; //массив товаров из JSON документа
    this._getProducts().then((data) => {
      //data - объект js
      this.goods = data;
      //console.log(data);
      this.render();
    });
  }

  _getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then((result) => result.json())
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObj = new ProductItem(product);
      //            this.allProducts.push(productObj);
      block.insertAdjacentHTML("beforeend", productObj.render());
    }
  }
}

class ProductItem {
  constructor(product, img = "https://via.placeholder.com/200x150") {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button id="${this.id}" class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

class Basket {
  constructor(container = ".basket") {
    this.container = container;
    this.goods = []; //массив товаров из JSON документа
    this._getBasket().then((data) => {
      //data - объект js

      this.goods = data.contents;
      this.countGoods = this.goods.length;
      this.amount = this.goods.reduce(
        (accum, item) => (accum += item.price),
        0
      );

      //                 console.log(data);
      this.render();
    });
    this.addToBasket();
    this.removeGood();
  }
  _getBasket() {
    return fetch(`${API}/getBasket.json`)
      .then((result) => result.json())
      .catch((error) => {
        console.log(error);
      });
  }

  addToBasket() {
    fetch(`${API}/addToBasket.json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log(data);
        if (data.result == 1) {
          const buyBtn = document.querySelectorAll(".buy-btn");
          buyBtn.forEach((item) => {
            item.addEventListener("click", () => {
              const basketGoods = document.querySelector(".basket");
              basketGoods.append(item.parentNode);

              item.classList.toggle("buy-btn");
              item.classList.add("buy_btn__del");
              item.innerHTML = "X";
            });
          });
        } else {
          return;
        }
      })
      .catch((err) => console.log(err));
  }

  getSum() {
    return this.goods.reduce((accum, item) => (accum += item.price), 0);
  }
  removeGood() {
    fetch(`${API}/addToBasket.json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.result == 1) {
          let delBtn = document.querySelectorAll(".basket-del");

          delBtn.forEach((item) => {
            item.addEventListener("click", () => {
              item.parentNode.parentNode.removeChild(item.parentNode);
            });
          });
        }
      });
  }

  render() {
    const block = document.querySelector(this.container);
    block.innerHTML = `${this.amount}-общая стоимость \n ${this.countGoods} - колличество товаров в корзине`;

    for (let product of this.goods) {
      const productObj = new ElemBasket(product);
      //            this.allProducts.push(productObj);

      block.insertAdjacentHTML("beforeend", productObj.render());
    }
  }
}

class ElemBasket {
  constructor(product, img = "https://via.placeholder.com/100x100") {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.quantity = product.quantity;
    this.img = img;
  }
  render() {
    return `<div class="basket-item" data-id="${this.id}">
      <img src="${this.img}" class="img-basket" alt="Some img" width='50' heigth='50'>
      <div class="desc-basket">
      <h3>${this.title}</h3>
      <p>${this.price} $</p>
      <p>${this.quantity}</p>
      
      
                       </div>
                    <button class="basket-del" >X</button >
                  
                    </div>`;
  }
}

/* window.onload = () => {
document.querySelector(".btn-cart").addEventListener("click", () => { let
basketMenu = document.querySelector(".basket"); basketMenu.style.visibility ===
"hidden" ? (basketMenu.style.visibility = "visible") :
(basketMenu.style.visibility = "hidden"); }); let list = new ProductsList(); let
buy = new Basket(); }; */
