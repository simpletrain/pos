function printReceipt(barcodes) {
  var items = getItems(barcodes);
  var cartItems = getCartItems(items);
  var receipt =
    '***<没钱赚商店>收据***\n' +
    getItemsString(cartItems) +
    '----------------------\n' +
    '总计：' + formatPrice(getAmount(cartItems)) + '(元)\n' +
    '**********************';

  console.log(receipt);
}
function getItems(barcodes) {
  var items = [];
  barcodes.forEach(function (barcode) {
    var item = findItem(barcode);
    if (item) {
      items.push(item);
    } else {
      console.log('error');
    }
  });
  return items;
}

function findItem(barcode) {
  var allItems = loadAllItems();
  var itemInfo;
  allItems.forEach(function (item) {
    if (barcode === item.barcode) {
      itemInfo = item;
      return false;
    }
  });
  return itemInfo;
}

function getCartItems(items) {
  var cartItems = [];
  items.forEach(function (item) {
    var cartItem = findCartItem(cartItems, item.barcode);
    if (cartItem) {
      cartItem.count++;
    } else {
      cartItems.push({item: item, count: 1});
    }
  });
  return cartItems;
}

function findCartItem(cartItems, barcode) {
  var foundCartItem;
  cartItems.forEach(function (cartItem) {
    if (cartItem.item.barcode === barcode) {
      foundCartItem = cartItem;
      return false;
    }
  });
  return foundCartItem;
}

function getSubTotal(count, price) {
  return count * price;
}

function getAmount(cartItems) {
  var amount = 0;

  cartItems.forEach(function (cartItem) {
    var item = cartItem.item;
    amount += getSubTotal(cartItem.count, item.price);
  });

  return amount;
}

function getItemsString(cartItems) {
  var itemsString = '';

  cartItems.forEach(function (cartItem) {
    var item = cartItem.item;
    itemsString +=
      '名称：' + item.name +
      '，数量：' + cartItem.count + item.unit +
      '，单价：' + formatPrice(item.price) +
      '(元)，小计：' + formatPrice(getSubTotal(cartItem.count, item.price)) + '(元)\n';
  });

  return itemsString;
}

function formatPrice(price) {
  return price.toFixed(2);
}
