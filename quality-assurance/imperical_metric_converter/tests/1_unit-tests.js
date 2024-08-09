const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('Correctly read a whole number input', function(done) {
        var input = '122kg'
        assert.equal(convertHandler.getNum(input), 122);
        done();
    });

    test('Correctly read a decimal number input 122.33', function(done) {
        var input = '122.33km'
        assert.equal(convertHandler.getNum(input), 122.33);
        done();
    });

    test('Correctly read a fractional input 6/2', function(done) {
        var input = '6/2km'
        assert.equal(convertHandler.getNum(input), 3);
        done();
    });

    test('Correctly read a fractional input with a decimal', function(done) {
        var input = '6.6/2km'
        assert.equal(convertHandler.getNum(input), 3.3);
        done();
    });

    test('Correctly return an error on a double-fraction i.e. 6/6/2', function(done) {
        assert.notEqual(convertHandler.getNum('6/6/2'), NaN);
        done();
    });

    test('Correctly default to a numerical input of 1 when no numerical input is provided', function(done) {
        var input = 'km'
        assert.equal(convertHandler.getNum(input), 1);
        done();
    });

    test ('Correctly read each valid input unit', function(done) {
        var units = ['mi', 'km', 'gal', 'l', 'lbs', 'kg', 'MI', 'KM', 'GAL', 'L', 'LBS', 'KG'];
        var unitsR = ['mi', 'km', 'gal', 'L', 'lbs', 'kg', 'mi', 'km', 'gal', 'L', 'lbs', 'kg'];
        units.forEach((unit, i) => {
        assert.equal(convertHandler.getUnit(unit), unitsR[i]);
        });
        done();
    });
  
    test('Correctly return an error for an invalid input unit', function(done) {
        var input = '122.33kml'
        assert.equal(convertHandler.getUnit(input), 'invalid unit');
        done();
    });

    test('Return the correct return unit for each valid input unit', function(done) {
        var units = ['mi', 'km', 'gal', 'L', 'lbs', 'kg'];
        var con = ['km', 'mi', 'L', 'gal', 'kg', 'lbs'];
        units.forEach((unit, i) => {
        assert.equal(convertHandler.getReturnUnit(unit), con[i]);
        });
        done();
    });

    test('Correctly return the spelled-out string unit for each valid input unit', function() {
        var units = ['mi', 'km', 'gal', 'L', 'lbs', 'kg'];
        var spell = ['mile', 'kilometer', 'gallon', 'liter', 'pound', 'kilogram'];
        units.forEach((unit, i) => {
        assert.equal(convertHandler.spellOutUnit(unit), spell[i]);
        });
    });

    test('Correctly convert gal to L', function() {
        assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
    });

    test('Correctly convert L to gal', function() {
        assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.1);
    });

    test('Correctly convert mi to km', function() {
        assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
    });

    test('Correctly convert km to mi', function() {
        assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.1);
    });

    test('Correctly convert lbs to kg', function() {
        assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.1);
    });
  
    test('Correctly convert kg to lbs', function() {
        assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1);
    });
});