function Pos(scanner, cart) {
  this.scanner = scanner;
  this.cart = cart;
}


Pos.prototype.scan = function (tags) {
  var _this = this;

  tags.forEach(function (tag) {
    var cartItem = _this.scanner.scan(tag);
    _this.cart.addCartItem(cartItem);
  });

};

Pos.prototype.printReceipt = function () {
  var myReceipt = new Receipt(this.cart);
  return myReceipt.receipt;
};
