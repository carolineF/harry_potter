'use strict';

var Discounter = require('../src/model/discounter');
var discounts = require('../seed/discounts');

describe('Discounter', function(){

  var discounter;

  beforeEach(function() {
    discounter = new Discounter();
  });

  it('should have a discounts attribute', function() {
    expect(discounter.discounts).toEqual(discounts);
  });

  describe('#find(discountName)', function() {

    it('when discountName exist should return a discount', function() {
      expect(discounter.find('TWO_DIFFERENT')).toBe(0.05);
    });

    it('when discountName not exist should return undefined', function() {
      expect(discounter.find('ONE_DIFFERENT')).toBeUndefined();
    });
  });

});
