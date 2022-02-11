const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  let units = convertHandler.units;
  suite("convertHandler.getNum(input)", () => {
    test("Whole Number Input", (done) => {
      assert.equal(convertHandler.getNum("100L"), 100);
      done();
    });
    test("Decimal Number Input", (done) => {
      assert.equal(convertHandler.getNum("5.5L"), 5.5);
      done();
    });
    test("Fractional Number Input", (done) => {
      assert.equal(convertHandler.getNum("1/2L"), 1 / 2);
      done();
    });
    test("Fractional Number Input with Decimal", (done) => {
      assert.equal(convertHandler.getNum("5.5/5L"), 5.5 / 5);
      done();
    });
    test("Double Fractional Input", (done) => {
      assert.equal(convertHandler.getNum("1/2/3L"), null);
      done();
    });
    test("No Input", (done) => {
      assert.equal(convertHandler.getNum("L"), 1);
      done();
    });
  });
  suite("convertHandler.getUnit(input)", () => {
    test("Valid Input Unit", (done) => {
      Object.getOwnPropertyNames(units).forEach((key) => {
        assert.equal(convertHandler.getUnit("5.5" + key), key);
      });
      done();
    });
    test("Invalid Input Unit", (done) => {
      assert.equal(convertHandler.getUnit("5.5g"), null);
      done();
    });
  });
  suite("convertHandler.getReturnUnit(initUnit)", () => {
    test("Correct Return Unit", (done) => {
      Object.getOwnPropertyNames(units).forEach((key) => {
        assert.equal(convertHandler.getReturnUnit(key), units[key].returnUnit);
      });
      done();
    });
  });
  suite("convertHandler.spellOutUnit(unit)", () => {
    test("Correct Unit String", (done) => {
      Object.getOwnPropertyNames(units).forEach((key) => {
        assert.equal(convertHandler.spellOutUnit(key), units[key].unitName);
      });
      done();
    });
  });
  suite("convertHandler.convert(initNum, initUnit)", () => {
    test("Gallon to Liter Conversion", (done) => {
      assert.equal(
        convertHandler.convert(5.5, "gal"),
        5.5 * units["gal"].factor
      );
      done();
    });
    test("Liter to Gallon Conversion", (done) => {
      assert.equal(convertHandler.convert(5.5, "L"), 5.5 * units["L"].factor);
      done();
    });
    test("Pound to Kilogram Conversion", (done) => {
      assert.equal(
        convertHandler.convert(5.5, "lbs"),
        5.5 * units["lbs"].factor
      );
      done();
    });
    test("Kilogram to Pound Conversion", (done) => {
      assert.equal(convertHandler.convert(5.5, "kg"), 5.5 * units["kg"].factor);
      done();
    });
    test("Mile to Kilometer Conversion", (done) => {
      assert.equal(convertHandler.convert(5.5, "mi"), 5.5 * units["mi"].factor);
      done();
    });
    test("Kilomet to Mile Conversion", (done) => {
      assert.equal(convertHandler.convert(5.5, "km"), 5.5 * units["km"].factor);
      done();
    });
  });
});
