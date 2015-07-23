function Cart() {
  this.cartItems = [];

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


Cart.prototype.getItemString = function () {
  var itemsString = '';

  this.cartItems.forEach(function (cartItem) {
    var item = cartItem.item;

    itemsString +=
      '名称：' + item.name +
      '，数量：' + cartItem.count + item.unit +
      '，单价：' + Utils.formatPrice(item.price) +
      '(元)，小计：' + Utils.formatPrice(Utils.getSubTotal(cartItem.count, item.price))
      + '(元)\n';
  });

  return itemsString;
};

Cart.prototype.getAmount = function () {
  var amount = 0;

  this.cartItems.forEach(function (cartItem) {
    var item = cartItem.item;
    amount += Utils.getSubTotal(cartItem.count, item.price);
  });
  return amount;

};
