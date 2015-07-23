function Receipt(cart) {
  this.printString =
    '***<没钱赚商店>收据***\n' +
    '打印时间：' + Utils.getTime() + '\n' +
    '----------------------\n' +
    this.getItemString(cart) +
    '----------------------\n' +
    this.getPromotionString(cart) +
    '----------------------\n' +
    '总计：' + Utils.formatPrice(this.getAmount(cart) - cart.save) + '(元)\n' +
    '节省：' + Utils.formatPrice(cart.save) + '(元)\n' +
    '**********************';
}

Receipt.prototype.getItemString = function (cart) {
  var itemsString = '';

  cart.cartItems.forEach(function (cartItem) {
    var item = cartItem.item;

    itemsString +=
      '名称：' + item.name +
      '，数量：' + cartItem.count + item.unit +
      '，单价：' + Utils.formatPrice(item.price) +
      '(元)，小计：' + Utils.formatPrice(Utils.getSubTotal(cartItem.count, item.price) - cartItem.save)
      + '(元)\n';
  });

  return itemsString;
};

Receipt.prototype.getAmount = function (cart) {
  var amount = 0;

  cart.cartItems.forEach(function (cartItem) {
    var item = cartItem.item;
    amount += Utils.getSubTotal(cartItem.count, item.price);
  });

  return amount;
};


Receipt.prototype.getPromotionString = function (cart) {
  var promotionString = '挥泪赠送商品：\n';

  cart.cartItems.forEach(function (cartItem) {
    if (cartItem.save !== 0) {
      var item = cartItem.item;
      promotionString +=
        '名称：' + item.name +
        '，数量：' + cartItem.discount + item.unit + '\n';
    }
  });

  return promotionString;
};
