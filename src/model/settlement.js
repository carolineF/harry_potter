'use strict';

var Discounter = require('./discounter');

function Settlement() {

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
    return basketItems[0] ? basketItems[0].book.price * basketItems[0].count : 0;
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
};

Settlement.prototype.getDiscount = function(length) {
  var discounter = new Discounter();

  if(length === 2) {
    return discounter.find('TWO_DIFFERENT');
  }else if(length === 3) {
    return discounter.find('THREE_DIFFERENT');
  }else if(length === 4) {
    return discounter.find('FOUR_DIFFERENT');
  }else if(length === 5) {
    return discounter.find('FIVE_DIFFERENT');
  }else {
    return 0;
  }
};

module.exports = Settlement;
