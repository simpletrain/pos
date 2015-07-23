/**
 * Created by ming on 7/22/15.
 */
function Cart() {
  this.cartItems = [];

}


Cart.prototype.addCartItem = function (cartItem) {

  this.cartItems.push(cartItem);

};



Cart.prototype.getItemString = function (cart) {
  var itemsString = '';

  cart.cartItems.forEach(function (cartItem) {
    var item = cartItem.item;

    itemsString +=
      '名称：' + item.name +
      '，数量：' + cartItem.count + item.unit +
      '，单价：' + formatPrice(item.price) +
      '(元)，小计：' + formatPrice(getSubTotal(cartItem.count, item.price) - cartItem.getDiscount())
      + '(元)\n';
  });

  return itemsString;
};



Cart.prototype.getPromotionString = function (cart) {
  var promotionString = '挥泪赠送商品：\n';

  cart.cartItems.forEach(function (cartItem) {
    if (cartItem.promotion === 'BUY_TWO_GET_ONE_FREE') {
      if (cartItem.count > 2) {
        var item = cartItem.item;
        promotionString +=
          '名称：' + item.name +
          '，数量：' + Math.floor(cartItem.count / 3) + item.unit + '\n';
      }
    }
  });

  return promotionString;
};



Cart.prototype.getAmount = function (cart) {
  var amount = 0;

  cart.cartItems.forEach(function (cartItem) {
    var item = cartItem.item;
    amount += getSubTotal(cartItem.count, item.price);
  });
  return amount;

};

Cart.prototype.getTotalSave = function (cart) {
  var totalSave = 0;

  cart.cartItems.forEach(function (cartItem) {
    totalSave += cartItem.getDiscount();
  });

  return totalSave;

};
