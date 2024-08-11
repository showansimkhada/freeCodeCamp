const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const { puzzlesAndSolutions } = require('../controllers/puzzle-strings.js');
let n = Math.floor(Math.random() * 5);

chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite('Post request to /api/solve', () => {
        // Solve a puzzle with valid puzzle string: POST request to /api/solve
        test('Solve a puzzle with valid puzzle', function(done) {
            chai
                .request(server)
                .post('/api/solve')
                .send({puzzle: puzzlesAndSolutions[n][0]})
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.solution, puzzlesAndSolutions[n][1]);
                    done();
                })
        })

        // Solve a puzzle with missing puzzle string: POST request to /api/solve
        test('Solve a puzzle with missing puzzle string', function(done) {
            chai
                .request(server)
                .post('/api/solve')
                .send('')
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Required field missing");
                    done();
                })
        })

        // Solve a puzzle with invalid characters: POST request to /api/solve
        test('Solve a puzzle with invalid characters', function(done) {
            chai
                .request(server)
                .post('/api/solve')
                .send({puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37p'})
                .end(function(err, res) {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.error, "Invalid characters in puzzle");
                    done();
                })
        })

        // Solve a puzzle with incorrect length: POST request to /api/solve
        test('Solve a puzzle with incorrect length', function(done) {
            chai
                .request(server)
                .post('/api/solve')
                .send({puzzle: '..9..5.1.85.4....2432......1.69.83.9.....6.62.71...9......1945....4.37.4.3..6.'})
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
                    done();
                })
        })

        // Solve a puzzle that cannot be solved: POST request to /api/solve
        test('Solve a puzzle that cannot be solved', function(done) {
            chai
                .request(server)
                .post('/api/solve')
                .send({puzzle: '115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'})
                .end(function(err, res) {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.error, "Puzzle cannot be solved");
                    done();
                })
        })
    })
    
    suite('Post request to /api/check', () => {
        // Check a puzzle placement with all fields: POST request to /api/check
        test('Check a puzzle placement with all fields', function(done) {
            chai
            .request(server)
            .post('/api/check')
            .send({puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                    coordinate: 'b3', value: "1"})
            .end(function(err, res) {
                assert.equal(res.status, 200)
                assert.equal(res.body.valid, true);
                done();
                })
        })
        // Check a puzzle placement with single placement conflict: POST request to /api/check
        test('Check a puzzle placement with single placement', function(done) {
            chai
                .request(server)
                .post('/api/check')
                .send({puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                        coordinate: 'A4', value: "9"})
                .end(function(err, res) {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.valid, false);
                    assert.equal(res.body.conflict.length, 1);
                    done();
                })
        })
        // Check a puzzle placement with multiple placement conflicts: POST request to /api/check
        test('Check a puzzle placement with multiple placement', function(done) {
            chai
                .request(server)
                .post('/api/check')
                .send({puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                        coordinate: 'A1', value: "1"})
                .end(function(err, res) {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.valid, false);
                    assert.equal(res.body.conflict.length, 2);
                    done();
                })
        })

        // Check a puzzle placement with all placement conflicts: POST request to /api/check
        test('Check a puzzle placement with all placement conflicts', function(done) {
            chai
                .request(server)
                .post('/api/check')
                .send({puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                        coordinate: 'B3', value: "2"})
                .end(function(err, res) {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.valid, false);
                    assert.equal(res.body.conflict.length, 3);
                    done();
                })
        })
        // Check a puzzle placement with missing required fields: POST request to /api/check
        test('Check a puzzle placement with missing required fields', function(done) {
            chai
                .request(server)
                .post('/api/check')
                .send({puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                        coordinate: '', value: 1})
                .end(function(err, res) {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.error, "Required field(s) missing");
                    done();
                })
        })
        // Check a puzzle placement with invalid characters: POST request to /api/check
        test('Check a puzzle placement with invalid characters', function(done) {
            chai
                .request(server)
                .post('/api/check')
                .send({puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.p',
                        coordinate: 'A1', value: 3})
                .end(function(err, res) {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.error, "Invalid characters in puzzle");
                    done();
                })
        })
        // Check a puzzle placement with incorrect length: POST request to /api/check
        test('Check a puzzle placement with incorrect length', function(done) {
            chai
                .request(server)
                .post('/api/check')
                .send({puzzle: '..9..5.1.85.4....2432......1.69.83.9.....6.62.71...9......1945....4.37.4.3..6.',
                        coordinate: 'A1', value: 3})
                .end(function(err, res) {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
                    done();
                })
        })
        // Check a puzzle placement with invalid placement coordinate: POST request to /api/check
        test('Check a puzzle placement with invalid placement coordinate', function(done) {
            chai
                .request(server)
                .post('/api/check')
                .send({puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                    coordinate: 'A0', value: 3})
                .end(function(err, res) {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.error, "Invalid coordinate");
                    done();
                })
        })
        // Check a puzzle placement with invalid placement value: POST request to /api/check
        test('Check a puzzle placement with invalid palcement value', function(done) {
            chai
                .request(server)
                .post('/api/check')
                .send({puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                        coordinate: 'A1', value: 33})
                .end(function(err, res) {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.error, "Invalid value");
                    done();
                })
        })
    })
});