function Cart() {
  this.cartItems = [];
  this.globalType = PromotionProcessor.findGlobalType();
  this.save = 0;
}


Cart.prototype.addCartItem = function (cartItem) {
  var indexOfCart = this.findInCart(cartItem);

  if (indexOfCart !== -1) {
    this.cartItems[indexOfCart].count += cartItem.count;
  } else {
    this.cartItems.push(cartItem);
  }
};


Cart.prototype.findInCart = function (cartItem) {
  var barcode = cartItem.item.barcode;

  for (var i = 0; i < this.cartItems.length; i++) {
    if (barcode === this.cartItems[i].item.barcode) {
      return i;
    }
  }
  return -1;
};

