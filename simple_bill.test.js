const functions = require("./simple_bill");

test("Adds 2 + 2 to equal 4", () => {
  expect(functions.add(2, 2)).toBe(4);
});

test("Multiplies first 100 of unit_used by 10 and the remainder by 20 and divides by 100", () => {
  expect(functions.calculate_bill(100)).toBe(10);
});
