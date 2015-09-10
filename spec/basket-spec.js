'use strict';

var Book = require('../src/model/book');
var BasketItem = require('../src/model/basket-item');
var Basket = require('../src/model/basket');

describe('Basket', function(){

  var book;
  var basketItem;
  var basket;

  beforeEach(function() {
    book = new Book('Harry Potter I', 8);
    basketItem = new BasketItem(book, 2);
    basket = new Basket([basketItem]);
  });

  it('should have a basketItems attribute', function() {
    expect(basket.basketItems).toEqual([basketItem]);
  });

  describe('#addBasketItem()',function() {
    it('can add a existent basketItem to basketItems', function() {
      spyOn(basket, 'findBasketItem').and.returnValue(basketItem);
      basket.addBasketItem(basketItem);
      expect(basket.basketItems[0].count).toBe(4);
    });

    it("can add a non-existent basketItem to basketItems", function() {
      spyOn(basket, 'findBasketItem').and.returnValue(undefined);
      basket.addBasketItem(basketItem);
      expect(basket.basketItems).toEqual([basketItem, basketItem]);
    });
  });

  describe('#findBasketItem()', function() {
    it('can find a basketItem in basketItems', function() {
      expect(basket.findBasketItem(basketItem)).toBe(basketItem);
    });

    it('can not find a basketItem in basketItems', function() {
      var item = new BasketItem(new Book('Harry Potter II', 8), 2);
      expect(basket.findBasketItem(item)).toBeUndefined();
    });
  });

});
