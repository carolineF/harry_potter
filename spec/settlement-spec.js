'use strict';

var Settlement = require('../src/model/settlement');

describe('Settlement', function() {

  var settlement;
  var basketItems;
  var basketArray;

  beforeEach(function() {
    settlement = new Settlement();
    basketItems = [
      {book: {title: 'Harry I', price: 8}, count: 1},
      {book: {title: 'Harry II', price: 8}, count: 2}
    ];
    basketArray = [{price: 8, count: 1},{price: 8, count: 2}];
  });

  describe('#format(basketItems)', function() {

    it('should return a new basketArray with price and count', function() {
      expect(settlement.format(basketItems)).toEqual(basketArray);
    });

    it('when basketItems is [] should return []', function() {
      expect(settlement.format([])).toEqual([]);
    });
  });

  describe('#account(basketItems)', function() {

    it('when basketItems has 1 different book should return 8 EUR', function() {
      basketItems = [
        {book: {title: 'Harry I', price: 8}, count: 1}
      ];
      expect(settlement.account(basketItems)).toBe(8);
    });

    it('when basketItems have 2 different books should return 15.2 EUR', function() {
      basketItems = [
        {book: {title: 'Harry I', price: 8}, count: 1},
        {book: {title: 'Harry II', price: 8}, count: 1},
      ];
      expect(settlement.account(basketItems)).toBe(15.2);
    });

    it('when basketItems have 3 different books should return 21.6 EUR', function() {
      basketItems = [
        {book: {title: 'Harry I', price: 8}, count: 1},
        {book: {title: 'Harry II', price: 8}, count: 1},
        {book: {title: 'Harry III', price: 8}, count: 1}
      ];
      expect(settlement.account(basketItems)).toBe(21.6);
    });

    it('when basketItems have 4 different books should return 25.6 EUR', function() {
      basketItems = [
        {book: {title: 'Harry I', price: 8}, count: 1},
        {book: {title: 'Harry II', price: 8}, count: 1},
        {book: {title: 'Harry III', price: 8}, count: 1},
        {book: {title: 'Harry VI', price: 8}, count: 1}
      ];
      expect(settlement.account(basketItems)).toBe(25.6);
    });

    it('when basketItems have 5 different books should return 30 EUR', function() {
      basketItems = [
        {book: {title: 'Harry I', price: 8}, count: 1},
        {book: {title: 'Harry II', price: 8}, count: 1},
        {book: {title: 'Harry III', price: 8}, count: 1},
        {book: {title: 'Harry VI', price: 8}, count: 1},
        {book: {title: 'Harry V', price: 8}, count: 1}
      ];
      expect(settlement.account(basketItems)).toBe(30);
    });

    it('when basketItems have 2 copies of first and 1 copies of second and 1 copies of third should return 29.6 EUR', function() {
      basketItems = [
        {book: {title: 'Harry I', price: 8}, count: 2},
        {book: {title: 'Harry II', price: 8}, count: 1},
        {book: {title: 'Harry III', price: 8}, count: 1}
      ];
      expect(settlement.account(basketItems)).toBe(29.6);
    });

    it('when basketItems have 2 copies of first and 2 copies of second and 1 copies of third and 1 copies of forth should return 40.8 EUR', function() {
      basketItems = [
        {book: {title: 'Harry I', price: 8}, count: 2},
        {book: {title: 'Harry II', price: 8}, count: 2},
        {book: {title: 'Harry III', price: 8}, count: 1},
        {book: {title: 'Harry VI', price: 8}, count: 1}
      ];
      expect(settlement.account(basketItems)).toBe(40.8);
    });
    it('when basketItems have 2 copies of first and 2 copies of second and 2 copies of third and 1 copies of forth and 1 copies of fifth should return 51.2 EUR', function() {
      basketItems = [
        {book: {title: 'Harry I', price: 8}, count: 2},
        {book: {title: 'Harry II', price: 8}, count: 2},
        {book: {title: 'Harry III', price: 8}, count: 2},
        {book: {title: 'Harry VI', price: 8}, count: 1},
        {book: {title: 'Harry V', price: 8}, count: 1}
      ];
      expect(settlement.account(basketItems)).toBe(51.2);
    });
  });

  describe('#getAmount(basketArray, count)', function() {

    it('when count = 5 should return 40.8 EUR', function() {
      basketArray = [
        {price: 8, count: 2},
        {price: 8, count: 2},
        {price: 8, count: 2},
        {price: 8, count: 1},
        {price: 8, count: 1}
      ];
      expect(settlement.getAmount(basketArray, 5)).toBe(51.6);
    });

    it('when count = 4 should return 43.2 EUR', function() {
      basketArray = [
        {price: 8, count: 2},
        {price: 8, count: 2},
        {price: 8, count: 2},
        {price: 8, count: 1},
        {price: 8, count: 1}
      ];
      expect(settlement.getAmount(basketArray, 4)).toBe(51.2);
    });
  });

  describe('#getDiscount(length)', function() {

    it('when length = 2 should return 5%', function() {
      expect(settlement.getDiscount(2)).toBe(0.05);
    });

    it('when length = 3 should return 10%', function() {
      expect(settlement.getDiscount(3)).toBe(0.1);
    });

    it('when length = 4 should return 20%', function() {
      expect(settlement.getDiscount(4)).toBe(0.2);
    });

    it('when length = 5 should return 25%', function() {
      expect(settlement.getDiscount(5)).toBe(0.25);
    });

    it('when length = 1 should return 0%', function() {
      expect(settlement.getDiscount(1)).toBe(0);
    });
  });
});
