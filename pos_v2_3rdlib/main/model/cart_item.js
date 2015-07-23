function CartItem(item, count) {
  this.item = item;
  this.count = count || 1;
  this.singleType = PromotionProcessor.findSinglePromotion(this.item.barcode);
  this.discount = 0;
  this.save = 0;
}
