function printReceipt(barcodes) {
  var items = getItems(barcodes);
  var cartItems = getCartItems(items);
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

function getItems(barcodes) {
  var items = [];
  barcodes.forEach(function (barcode) {
    var item = findItem(barcode.substr(0, 10));
    if (item) {
      items = pushItem(items, item, barcode.substr(11));
    } else {
      console.log('error');
    }
  });
  return items;
}

function findItem(barcode) {
  var allItems = loadAllItems();
  var itemInfo;
  for (var i = 0; i < allItems.length; i++) {
    if (barcode === allItems[i].barcode) {
      itemInfo = allItems[i];
      break;
    }
  }
  return itemInfo;
}

function pushItem(items, item, count) {
  if (count) {
    for (var i = 0; i < parseInt(count); i++) {
      items.push(item);
    }
  } else {
    items.push(item)
  }
  return items;
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
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].item.barcode === barcode) {
      foundCartItem = cartItems[i];
      break;
    }
  }
  return foundCartItem;
}

function getItemsString(cartItems) {
  var itemsString = '';

  cartItems.forEach(function (cartItem) {
    var item = cartItem.item;
    itemsString +=
      '名称：' + item.name +
      '，数量：' + cartItem.count + item.unit +
      '，单价：' + formatPrice(item.price) +
      '(元)，小计：' + formatPrice(getSubTotal(cartItem.count, item.price) - discount(cartItem)) + '(元)\n';
  });

  return itemsString;
}

function discount(cartItem) {
  if (loadPromotions()[0].barcodes.indexOf(cartItem.item.barcode) !== -1) {
    return Math.floor(cartItem.count / 3) * cartItem.item.price;
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
    if (loadPromotions()[0].barcodes.indexOf(cartItem.item.barcode) !== -1) {
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
    if (loadPromotions()[0].barcodes.indexOf(cartItem.item.barcode) !== -1) {
      if (cartItem.count > 2) {
        totalSave += Math.floor(cartItem.count / 3) * cartItem.item.price;
      }
    }
  });

  return totalSave;
}

function formatPrice(price) {
  return price.toFixed(2);
}
