function printReceipt(inputs) {
  var outputs;
  var posHead = '***<没钱赚商店>收据***\n';
  var posBody = '';
  var totalCost = 0;
  for (var i = 0; i < inputs.length; i++) {
    posBody += '名称：' + inputs[i].name
      + '，数量：' + inputs[i].count + inputs[i].unit
      + '，单价：' + inputs[i].price.toFixed(2) + '(元)'
      + '，小计：' + (inputs[i].count * inputs[i].price).toFixed(2) + '(元)\n';
    totalCost += inputs[i].count * inputs[i].price;
  }
  var posLine = '----------------------\n';
  var posTotalCost = '总计：' + totalCost.toFixed(2) + '(元)\n';
  var posEnd = '**********************';
  outputs = posHead + posBody + posLine + posTotalCost + posEnd;
  console.log(outputs);
}
//需要重构 分离函数
