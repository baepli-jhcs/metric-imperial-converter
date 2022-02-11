"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.route("/api/convert").get((req, res) => {
    let { input } = req.query;
    let initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    if (!initNum && !initUnit) {
      return res.send("invalid number and unit");
    } else if (!initNum) {
      return res.send("invalid number");
    } else if (!initUnit) {
      return res.send("invalid unit");
    }
    initNum = parseFloat(initNum.toFixed(5));
    const returnNum = parseFloat(convertHandler.convert(initNum, initUnit).toFixed(5));
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const initUnitName = convertHandler.spellOutUnit(initUnit);
    const returnUnitName = convertHandler.spellOutUnit(returnUnit);
    const string = convertHandler.getString(
      initNum,
      initUnitName,
      returnNum,
      returnUnitName
    );
    res.json({initNum, initUnit, returnNum, returnUnit, string});
  });
};
