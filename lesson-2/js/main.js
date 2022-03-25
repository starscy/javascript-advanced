class ProductList {
  constructor(container = ".products") {
    this.container = container;
    this.goods = [];
    this._fetchProducts(); //рекомендация, чтобы метод был вызван в текущем классе
    this.render(); //вывод товаров на страницу
  }
  _fetchProducts() {
    this.goods = [
      { id: 1, title: "Notebook", price: 2000 },
      { id: 2, title: "Mouse", price: 20 },
      { id: 3, title: "Keyboard", price: 200 },
      { id: 4, title: "Gamepad", price: 50 },
    ];
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const item = new ProductItem(product);
      block.insertAdjacentHTML("beforeend", item.render());
      //           block.innerHTML += item.render();
    }
  }

  calcPriceAllProducts() {
    let sum = 0;
    for (let i = 0; i < this.goods.length; i++) {
      sum += this.goods[i].price;
    }
    return sum;
  }
}

class ProductItem {
  constructor(product, img = "https://via.placeholder.com/200x150") {
    this.title = product.title;
    this.id = product.id;
    this.price = product.price;
    this.img = img;
  }
  render() {
    return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`;
  }
}

class Bascet {
  constructor() {
    this.goods = [];
    this.render();
  }
  addBascet() {} //добавление товара в корзину
  deleteBascet() {} // удаление товара из корзины
  countPriceBascet() {} // подсчет стоимости товаров к корзине
  confirmOrder() {} // проверить и подтвердить заказ
  render() {}
}
/**
 * @param product - объект класса Bascet
 */
class BascetProduct {
  constructor(product, img = "https://via.placeholder.com/200x150") {
    this.title = product.title;
    this.id = product.id;
    this.price = product.price;
    this.img = img;
  }
  render() {}
}

let list = new ProductList();
console.log(list.calcPriceAllProducts());

//const products = [
//    {id: 1, title: 'Notebook', price: 2000},
//    {id: 2, title: 'Mouse', price: 20},
//    {id: 3, title: 'Keyboard', price: 200},
//    {id: 4, title: 'Gamepad', price: 50},
//];
//
//const renderProduct = (product,img='https://placehold.it/200x150') => {
//    return `<div class="product-item">
//                <img src="${img}">
//                <h3>${product.title}</h3>
//                <p>${product.price}</p>
//                <button class="buy-btn">Купить</button>
//            </div>`
//};
//const renderPage = list => document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
//
//renderPage(products);
