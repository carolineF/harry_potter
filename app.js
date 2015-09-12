'use strict';

var Book = require('./src/model/book');
var BasketItem = require('./src/model/basket-item');
var Basket = require('./src/model/basket');
var Settlement = require('./src/model/settlement');
var basketItems = require('./seed/basket-items');

function getBigDiscount() {
  var basket = new Basket(basketItems);

  var settlement = new Settlement();
  var amount = settlement.account(basket.basketItems);

  console.log('the biggest discount is ' + amount);
}

getBigDiscount();
