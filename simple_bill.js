const functions = {
  add: (num1, num2) => num1 + num2,
  calculate_bill: function(unit_used) {
    if (unit_used > 100) {
      var subtract_100 = unit_used - 100;
      var bill_pence = 100 * 10 + subtract_100 * 20;
      var bill = bill_pence / 100;
      return bill;
    } else if (unit_used >= 0 && unit_used <= 100) {
      var bill_pence = unit_used * 10;
      var bill = bill_pence / 100;
      return bill;
    }
  }
  //   add: function(num1, num2) {
  //     return num1 + num2;
};

module.exports = functions;
