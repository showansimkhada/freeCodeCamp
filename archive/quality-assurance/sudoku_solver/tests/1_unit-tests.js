const chai = require('chai');
const { puzzlesAndSolutions } = require('../controllers/puzzle-strings.js');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
let n = Math.floor(Math.random() * 5);

suite('Unit Tests', () => {
    let valPuzz = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    let invPuzz = '..9..5.1.85.4....2432....p.1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    let lPuzz = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.';
    suite('Validating Puzzle', () => {
        // Logic handles a valid puzzle string of 81 characters
        test('Valid puzzle string', function() {
            assert.equal(solver.validate(valPuzz), valPuzz);
        })
        // Logic handles a puzzle string with invalid characters (not 1-9 or .)
        test('Invalid characters', function() {
            assert.equal(solver.validate(invPuzz), "Invalid characters in puzzle");
        })
        // Logic handles a puzzle string that is not 81 characters in length
        test('Less than 81 character', function() {
            assert.equal(solver.validate(lPuzz), 'Expected puzzle to be 81 characters long');
        })
    })
    suite('Row placement', () => {
        // Logic handles a valid row placement
        test('Valid row placement', function() {
            assert.isFalse(solver.checkRowPlacement(valPuzz, 'a', '1', 2))
        })
        // Logic handles an invalid row placement
        test('Invalid row placement', function() {
            assert.isTrue(solver.checkRowPlacement(valPuzz, 'a', '1', 9))
        })
    })
    suite('Column placement', () => {
        test('Valid column placement', function() {
            assert.isFalse(solver.checkColPlacement(valPuzz, 'a', '1', 2))
        })
        // Logic handles an invalid row placement
        test('Invalid column placement', function() {
            assert.isTrue(solver.checkColPlacement(valPuzz, 'a', '1', 8))
        })
    })
    suite('Region placement', () => {
        test('Valid region placement', function() {
            assert.isFalse(solver.checkRegionPlacement(valPuzz, 'a', '1', 1))
        })
        // Logic handles an invalid row placement
        test('Invalid region placement', function() {
            assert.isTrue(solver.checkRegionPlacement(valPuzz, 'a', '1', 8))
        })
    })
    suite('Solutions', () => {
        test('Valid puzzle pass the solver', function() { 
            assert.notEqual(solver.solve(valPuzz), valPuzz)
        })
        test('Invalid puzzle strings fail the solver', function() {
            assert.match(solver.solve('.19..5.1.85.4....2432......1.69.83.9.....6.62.71...9......1945....4.37.4.3..6..'), /[.]/)
        })
        test('Return solved puzzle', function() {
            assert.strictEqual(solver.solve(puzzlesAndSolutions[n][0]), puzzlesAndSolutions[n][1])
        })
    })
});