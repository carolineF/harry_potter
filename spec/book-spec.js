'use strict';

var Book = require('../src/model/book');

describe('Book', function(){

  it('should have a title attribute', function() {
    var book = new Book('Harry Potter I', 8);
    expect(book.title).toBe('Harry Potter I');
  });

  it('should have a price attribute', function() {
    var book = new Book('Harry Potter I', 8);
    expect(book.price).toBe(8);
  });
});
