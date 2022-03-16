"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    if (!initNum && !initUnit) {
      res.send("invalid number and unit");
    } else if (!initUnit) {
      res.send("invalid unit");
    } else if (!initNum) {
      res.send("invalid number");
    }

    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({ initNum, initUnit, returnNum, returnUnit, string });
  });
};
