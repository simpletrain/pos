function printReceipt(tags) {
  var myCart = new Cart();
  Pos.getItemsIn(myCart, tags);
  var receipt =
    '***<没钱赚商店>收据***\n' +
    '打印时间：' + Pos.getTime() + '\n' +
    '----------------------\n' +
    myCart.getItemString(myCart) +
    '----------------------\n' +
    myCart.getPromotionString(myCart) +
    '----------------------\n' +
    '总计：' + formatPrice(myCart.getAmount(myCart) - myCart.getTotalSave(myCart)) + '(元)\n' +
    '节省：' + formatPrice(myCart.getTotalSave(myCart)) + '(元)\n' +
    '**********************';
  console.log(receipt);
}


function formatPrice(price) {
  return price.toFixed(2);
}

function getSubTotal(count, price) {
  return count * price;
}
