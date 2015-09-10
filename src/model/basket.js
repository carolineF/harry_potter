'use strict';

function Basket(basketItems) {
  this.basketItems = basketItems || [];
}

Basket.prototype.addBasketItem = function(item) {

  var basketItem = this.findBasketItem(item);
  if(basketItem) {
    basketItem.count += item.count;
  }else{
    this.basketItems.push(item);
  }
};

Basket.prototype.findBasketItem = function(item) {
  var existBasketItem;

  this.basketItems.forEach(function(basketItem) {
    var isExist = basketItem.book.title === item.book.title;
    if(isExist) {
      existBasketItem = basketItem;
    }
  });

  return existBasketItem;
};

module.exports = Basket;
