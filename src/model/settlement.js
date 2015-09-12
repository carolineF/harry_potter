'use strict';

var Discounter = require('./discounter');

function Settlement() {
  this.discounter = new Discounter();
}

Settlement.prototype.format = function(basketItems) {
  var basketArray = [];

  basketItems.forEach(function(basketItem) {
    basketArray.push({
      price: basketItem.book.price,
      count: basketItem.count
    });
  });

  return basketArray;
};

Settlement.prototype.account = function(basketItems) {
  var amounts = [];
  var count = basketItems.length;

  if(count < 2) {
    return basketItems[0] ? basketItems[0].book.price : 0;
  }

  while(count >= 2) {

    var basketArray = this.format(basketItems);
    var amount = this.getAmount(basketArray, count--);
    if(amount > 0) {
      amounts.push(amount);
    }
  }

  return Math.min.apply(Math, amounts);
};

Settlement.prototype.getAmount = function(basketArray, count) {
  var amount = 0;
  var items = basketArray;

  while(items.length > 0) {
    items = [];

    basketArray.forEach(function(basketItem) {
      if(basketItem.count > 0 && items.length < count) {
        items.push(basketItem);
        basketItem.count -= 1;
      }
    });

    var discount = this.getDiscount(items.length);

    if(items.length <= 0) {
      return amount;
    }
    var price = 0;
    items.forEach(function(item) {
      price += item.price;
    });

    amount += price - price * discount;
  }

  return price;
};

Settlement.prototype.getDiscount = function(length) {
  if(length === 2) {
    return this.discounter.find('TWO_DIFFERENT');
  }else if(length === 3) {
    return this.discounter.find('THREE_DIFFERENT');
  }else if(length === 4) {
    return this.discounter.find('FOUR_DIFFERENT');
  }else if(length === 5) {
    return this.discounter.find('FIVE_DIFFERENT');
  }else {
    return 0;
  }
};

module.exports = Settlement;
