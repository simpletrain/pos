function Utils() {

}

Utils.getTime = function () {

  dateDigitToString = function (num) {
    return num < 10 ? '0' + num : num;
  };

  var currentDate = new Date(),
    year = dateDigitToString(currentDate.getFullYear()),
    month = dateDigitToString(currentDate.getMonth() + 1),
    date = dateDigitToString(currentDate.getDate()),
    hour = dateDigitToString(currentDate.getHours()),
    minute = dateDigitToString(currentDate.getMinutes()),
    second = dateDigitToString(currentDate.getSeconds());
  return year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;

};


Utils.formatPrice = function (price) {
  return price.toFixed(2);
};

Utils.getSubTotal = function (count, price) {
  return count * price;
};
