function Receipt(cart) {
  this.receipt =
    '***<没钱赚商店>收据***\n' +
    '打印时间：' + Utils.getTime() + '\n' +
    '----------------------\n' +
    cart.getItemString() +
    '----------------------\n' +

    '----------------------\n' +
    '总计：' + Utils.formatPrice(cart.getAmount()) + '(元)\n' +
    '节省：' + 0 + '(元)\n' +
    '**********************';
}
