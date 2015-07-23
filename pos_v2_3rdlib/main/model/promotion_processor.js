function PromotionProcessor() {

}


PromotionProcessor.findGlobalType = function () {
  var allPromotion = loadPromotions();

  for (var i = 0; i < allPromotion.length; i++) {
    if (allPromotion[i].barcode === []) {
      return allPromotion[i].type;
    }
  }
  return undefined;
};


PromotionProcessor.findSinglePromotion = function (barcode) {
  var allPromotion = loadPromotions();
  var promotionType;

  for (var i = 0; i < allPromotion.length; i++) {
    if (allPromotion[i].barcodes.indexOf(barcode) !== -1) {
      promotionType = allPromotion[i].type;
    }
  }
  return promotionType;
};

PromotionProcessor.CalculatePromotion = function (cart) {
  PromotionProcessor.CalculateSinglePromotion(cart);
  PromotionProcessor.CalculateGlobalPromotion(cart);

  if (!cart.globalType) {
    cart.cartItems.forEach(function (cartItem) {
      cart.save += cartItem.save;
    });
  } else {
    //Wait for scheme
  }
};


PromotionProcessor.CalculateSinglePromotion = function (cart) {
  var cartItems = cart.cartItems;

  cartItems.forEach(function (cartItem) {
    if (cartItem.singleType === 'BUY_TWO_GET_ONE_FREE') {
      cartItem.discount = Math.floor(cartItem.count / 3);
      cartItem.save = cartItem.discount * cartItem.item.price;
    } else {
      //other promotions
    }
  });
};

PromotionProcessor.CalculateGlobalPromotion = function (cart) {
  // Not available now.
};
