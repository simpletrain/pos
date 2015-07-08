function getPosBody(inputsArray) {
  var body = '';
  var sumPrice = 0;
  for (var i = 0; i < inputsArray.length; i++) {
    body += '名称：' + inputsArray[i].name
      + '，数量：' + inputsArray[i].count + inputsArray[i].unit
      + '，单价：' + inputsArray[i].price.toFixed(2) + '(元)'
      + '，小计：' + (inputsArray[i].count * inputsArray[i].price).toFixed(2) + '(元)\n';
    sumPrice += inputsArray[i].count * inputsArray[i].price;
  }
  return {posBody: body, totalCost: sumPrice};
}
function printReceipt(inputs) {
  var outputs;
  var totalCost = getPosBody(inputs).totalCost;
  var posHead = '***<没钱赚商店>收据***\n';
  var posBody = getPosBody(inputs).posBody;
  var posLine = '----------------------\n';
  var posTotalCost = '总计：' + totalCost.toFixed(2) + '(元)\n';
  var posEnd = '**********************';
  outputs = posHead + posBody + posLine + posTotalCost + posEnd;
  console.log(outputs);
}
//遍历两次？？
