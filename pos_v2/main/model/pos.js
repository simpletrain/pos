/**
 * Created by ming on 7/22/15.
 */
function Pos() {

}

Pos.getItemsIn = function (cart, tags) {

  tags.forEach(function (tag) {
    var splitedBarcode = tag.split('-');
    var barcode = splitedBarcode[0];
    var item = Pos.findItem(barcode);
    var count = splitedBarcode[1] || 1;
    var isInCart = Pos.findInCart(cart, barcode);
    if (isInCart) {
      cart.cartItems[cart.cartItems.length - 1].count++;
    } else {
      var cartItem = new CartItem(item, count);
      cart.addCartItem(cartItem);
    }
  });

};

Pos.findItem = function (barcode) {
  var allItems = loadAllItems();
  var item;
  for (var i = 0; i < allItems.length; i++) {
    if (barcode === allItems[i].barcode) {
      item = allItems[i];
      break;
    }
  }
  return item;
};

Pos.findInCart = function (cart, barcode) {
  for (var i = 0; i < cart .cartItems.length; i++) {
    if (barcode === cart.cartItems[i].item.barcode) {
      return true;
    }
  }
  return false;
};

Pos.getTime = function () {

  dateDigitToString = function (num) {
    return num < 10 ? '0' + num : num;
  };

  var currentDate = new Date(),
    year = dateDigitToString(currentDate.getFullYear()),
    month = dateDigitToString(currentDate.getMonth() + 1),
    date = dateDigitToString(currentDate.getDate()),
    hour = dateDigitToString(currentDate.getHours()),
    minute = dateDigitToString(currentDate.getMinutes()),
    second = dateDigitToString(currentDate.getSeconds());
  return year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
};
