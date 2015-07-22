/**
 * Created by ming on 7/22/15.
 */
function CartItem(item, count) {
  this.item = item;
  this.count = count || 1;
  this.promotion = this.getPromotion();
}


CartItem.prototype.getPromotion = function () {
  var allPromotion = loadPromotions();
  var promotion;
  for (var i = 0; i < allPromotion.length; i++) {
    if (allPromotion[i].barcodes.indexOf(this.item.barcode) !== -1) {
      promotion = allPromotion[i].type;
    }
  }
  return promotion;
};

CartItem.prototype.getDiscount = function () {
  if (this.promotion === 'BUY_TWO_GET_ONE_FREE') {
    return Math.floor(this.count / 3) * this.item.price;
  }
  return 0;
};
