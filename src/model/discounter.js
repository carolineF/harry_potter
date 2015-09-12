'use strict';

var discounts = require('../../seed/discounts');

function Discounter() {
  this.discounts = discounts;
};

Discounter.prototype.allName = function() {
  return Object.keys(this.discounts);
};

Discounter.prototype.find = function(discountName) {
  return this.discounts[discountName];
};

module.exports = Discounter;
