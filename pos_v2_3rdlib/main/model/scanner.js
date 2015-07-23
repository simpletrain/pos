function Scanner(scannerType) {
  this.type = scannerType;
}


Scanner.prototype.scan = function (tag) {
  if (this.type === 'barcode') {
    var splitedBarcode = tag.split('-');
    var barcode = splitedBarcode[0];
    var item = Item.find(barcode);
    var count = parseFloat(splitedBarcode[1]) || 1;
    return new CartItem(item, count);
  }
};
