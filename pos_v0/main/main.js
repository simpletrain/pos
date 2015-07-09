function getPosBody(inputsArray) {
  var list = '';
  var sumPrice = 0;
  for (var i = 0; i < inputsArray.length; i++) {
    list += '名称：' + inputsArray[i].name
      + '，数量：' + inputsArray[i].count + inputsArray[i].unit
      + '，单价：' + inputsArray[i].price.toFixed(2) + '(元)'
      + '，小计：' + (inputsArray[i].count * inputsArray[i].price).toFixed(2) + '(元)\n';
    sumPrice += inputsArray[i].count * inputsArray[i].price;
  }
  return {posList: list, totalCost: sumPrice};
}
function printReceipt(inputs) {
  var outputs;
  var posHead = '***<没钱赚商店>收据***\n';
  var posBody = getPosBody(inputs);
  var posList = posBody.posList;
  var totalCost = posBody.totalCost;
  var posLine = '----------------------\n';
  var posTotalCost = '总计：' + totalCost.toFixed(2) + '(元)\n';
  var posEnd = '**********************';
  outputs = posHead + posList + posLine + posTotalCost + posEnd;
  console.log(outputs);
}
