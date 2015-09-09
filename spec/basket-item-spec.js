'use strict';

var Book = require('../src/model/book');
var BasketItem = require('../src/model/basket-item');

describe('BasketItem', function(){

  var basketItem;
  var book;

  beforeEach(function() {
    book = new Book('Harry Potter I', 8);
    basketItem = new BasketItem(book, 2);
  });

  it('should have a book attribute', function() {
    expect(basketItem.book).toBe(book);
  });

  it('should have a count attribute', function() {
    expect(basketItem.count).toBe(2);
  });
});
