function printReceipt(tags) {
  var cartItems = getCartItems(tags);
  var receipt =
    '***<没钱赚商店>收据***\n' +
    getItemsString(cartItems) +
    '----------------------\n' +
    getPromotionString(cartItems) +
    '----------------------\n' +
    '总计：' + formatPrice(getAmount(cartItems) - getTotalSave(cartItems)) + '(元)\n' +
    '节省：' + formatPrice(getTotalSave(cartItems)) + '(元)\n' +
    '**********************';
  console.log(receipt);
}

function getCartItems(tags) {
  var cartItems = [];
  tags.forEach(function (tag) {
    var splitedBarcode = tag.split('-');
    var barcode = splitedBarcode[0];
    var item = findItem(barcode);
    var count = splitedBarcode[1] || 1;
    var cartItem = findCartItem(cartItems, barcode);
    if (cartItem) {
      cartItem.count++;
    } else {
      var type = getPromotionType(barcode);
      cartItems.push({item: item, count: count, type: type});
    }
  });

  return cartItems;
}

function findItem(barcode) {
  var allItems = loadAllItems();
  var item;
  for (var i = 0; i < allItems.length; i++) {
    if (barcode === allItems[i].barcode) {
      item = allItems[i];
      break;
    }
  }
  return item;
}

function findCartItem(cartItems, barcode) {
  var cartItem;
  for (var i = 0; i < cartItems.length; i++) {
    if (barcode === cartItems[i].item.barcode) {
      cartItem = cartItems[i];
      break;
    }
  }
  return cartItem;
}

function getPromotionType(barcode) {
  var promotionType;
  for (var i = 0; i < loadPromotions().length; i++) {
    if (loadPromotions()[i].barcodes.indexOf(barcode) !== -1) {
      promotionType = loadPromotions()[i].type;
    }
  }
  return promotionType;
}


function getItemsString(cartItems) {
  var itemsString = '';

  cartItems.forEach(function (cartItem) {
    var item = cartItem.item;
    itemsString +=
      '名称：' + item.name +
      '，数量：' + cartItem.count + item.unit +
      '，单价：' + formatPrice(item.price) +
      '(元)，小计：' + formatPrice(getSubTotal(cartItem.count, item.price) - discount(cartItem))
      + '(元)\n';
  });

  return itemsString;
}

function discount(cartItem) {
  var item = cartItem.item;
  if (cartItem.type === 'BUY_TWO_GET_ONE_FREE') {
    return Math.floor(cartItem.count / 3) * item.price;
  }
  return 0;
}

function getAmount(cartItems) {
  var amount = 0;

  cartItems.forEach(function (cartItem) {
    var item = cartItem.item;
    amount += getSubTotal(cartItem.count, item.price);
  });
  return amount;
}

function getSubTotal(count, price) {
  return count * price;
}


function getPromotionString(cartItems) {
  var promotionString = '挥泪赠送商品：\n';

  cartItems.forEach(function (cartItem) {
    if (cartItem.type === 'BUY_TWO_GET_ONE_FREE') {
      if (cartItem.count > 2) {
        var item = cartItem.item;
        promotionString +=
          '名称：' + item.name +
          '，数量：' + Math.floor(cartItem.count / 3) + item.unit + '\n';
      }
    }
  });

  return promotionString;
}


function getTotalSave(cartItems) {
  var totalSave = 0;

  cartItems.forEach(function (cartItem) {
    if (cartItem.type === 'BUY_TWO_GET_ONE_FREE') {
      var item = cartItem.item;
      totalSave += Math.floor(cartItem.count / 3) * item.price;
    }
  });

  return totalSave;
}

function formatPrice(price) {
  return price.toFixed(2);
}
