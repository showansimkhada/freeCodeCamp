'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
    let convertHandler = new ConvertHandler();
    
    app.route('/api/convert').get((req, res) => {
        let inp = req.query.input;
        let num = convertHandler.getNum(inp);
        let unit = convertHandler.getUnit(inp);
        if (num == 'invalid number' && unit == 'invalid unit') {
        return res.json('invalid number and unit');
        }
        if (unit == 'invalid unit') {
        return res.json('invalid unit');
        } 
        if (num == 'invalid number') {
        return res.json('invalid number');
        }
        let conversion = convertHandler.convert(num, unit);
        let returnUnit = convertHandler.getReturnUnit(unit);
        let string = convertHandler.getString(num, unit, conversion, returnUnit);
        res.json({
        initNum: num, 
        initUnit: unit,
        returnNum: conversion,
        returnUnit: returnUnit, 
        string: string
        });
    });

    //404 Not Found Middleware
    app.use(function(req, res, next) {
        res.status(404)
        .type('text')
        .send('Not Found');
    });
};