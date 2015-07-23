function printReceipt(tags) {
  var scanner = new Scanner('barcode');
  var myCart = new Cart();
  var myPos = new Pos(scanner, myCart);

  myPos.scan(tags);

  console.log(myPos.printReceipt());

}
