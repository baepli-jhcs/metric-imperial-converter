function ConvertHandler() {
  this.units = {
    gal: {
      unitName: "gallons",
      returnUnit: "L",
      factor: 3.78541,
    },
    lbs: {
      unitName: "pounds",
      returnUnit: "kg",
      factor: 0.453592,
    },
    mi: {
      unitName: "miles",
      returnUnit: "km",
      factor: 1.609340,
    },
    L: {
      unitName: "liters",
      returnUnit: "gal",
      factor: 0.264172,
    },
    kg: {
      unitName: "kilograms",
      returnUnit: "lbs",
      factor: 2.204624,
    },
    km: {
      unitName: "kilometers",
      returnUnit: "mi",
      factor: 0.621373,
    },
  };
  this.getNum = function (input) {
    let newNumber = "";
    try {
      newNumber = input.match(/[^a-z]/gi).join("");
    } catch {
      return 1;
    }
    if (newNumber.match(/\//g)) {
      return this.divideFraction(newNumber);
    }
    return parseFloat(newNumber);
  };
  this.divideFraction = (input) => {
    input = input.split("/");
    return input.length == 2 ? input.reduce((a, b) => a / b) : null;
  };
  this.getUnit = function (input) {
    let unitName = "";
    try {
      unitName = input.match(/[a-z]/gi).join("");
    } catch {
      return null;
    }
    if (
      !(unitName.toLowerCase() in this.units) &&
      !(unitName.toUpperCase() in this.units)
    )
      return null;
    else if (unitName.toLowerCase() in this.units) {
      return unitName.toLowerCase();
    } else if (unitName.toUpperCase() in this.units) {
      return unitName.toUpperCase();
    }
  };

  this.getReturnUnit = function (initUnit) {
    return this.units[initUnit].returnUnit;
  };

  this.spellOutUnit = function (unit) {
    return this.units[unit].unitName;
  };

  this.convert = function (initNum, initUnit) {
    return initNum * this.units[initUnit].factor
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
}
module.exports = ConvertHandler;
