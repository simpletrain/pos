function printReceipt(inputs) {
  var outputs;
  var posHead = '***<没钱赚商店>收据***\n';
  var itemArray = deleteDuplication(getItemInfo(inputs));
  var posBody = getPosBody(itemArray);
  var posList = posBody.posList;
  var posFree = freeList(itemArray);
  var posLine = '----------------------\n';
  var posTotalCost = '总计：' + posBody.totalCost.toFixed(2) + '(元)\n'
    + '节省：' + posBody.save.toFixed(2) + '(元)\n';
  var posEnd = '**********************';
  outputs = posHead + posList + posLine + posFree + posLine + posTotalCost + posEnd;
  console.log(outputs);
}

function freeList(itemArray) {
  var list = '挥泪赠送商品：\n';
  for (var i = 0; i < itemArray.length; i++) {
    if (itemArray[i].count > 2) {
      list += '名称：' + itemArray[i].name + '，数量：1' + itemArray[i].unit + '\n'
    }
  }
  return list;
}

function getPosBody(inputsArray) {
  var list = '';
  var sumPrice = 0;
  var saveMoney = 0;
  for (var i = 0; i < inputsArray.length; i++) {
    var discount = (inputsArray[i].count > 2) ? 1 : 0;
    var itemCost = (inputsArray[i].count - discount) * inputsArray[i].price;
    list += '名称：' + inputsArray[i].name
      + '，数量：' + inputsArray[i].count + inputsArray[i].unit
      + '，单价：' + inputsArray[i].price.toFixed(2) + '(元)'
      + '，小计：' + (itemCost).toFixed(2) + '(元)\n';
    sumPrice += itemCost;
    saveMoney += inputsArray[i].price * discount;
  }
  return {posList: list, totalCost: sumPrice, save: saveMoney};
}

function deleteDuplication(originList) {
  var newList = [];
  var barcodeNow = '';
  for (var i = 0; i < originList.length; i++) {
    if (originList[i].barcode !== barcodeNow) {
      newList.push(originList[i]);
      barcodeNow = originList[i].barcode;
    } else {
      newList[newList.length - 1].count++;
    }
  }
  return newList;
}

function getItemInfo(originList) {
  var newList = [];
  for (var i = 0; i < originList.length; i++) {
    var itemList = findItemList(originList[i]);
    if (itemList) {
      newList.push(itemList);
    }
  }
  return newList;
}

function findItemList(itemA) {
  var itemList;
  for (var i = 0; i < loadAllItems().length; i++) {
    if (itemA === loadAllItems()[i].barcode) {
      itemList = loadAllItems()[i];
      itemList.count = 1;
      return itemList;
    } else if (itemA.slice(0, -2) === loadAllItems()[i].barcode) {
      itemList = loadAllItems()[i];
      itemList.count = parseInt(itemA.slice(-1));
    }
  }
  return itemList;
}


