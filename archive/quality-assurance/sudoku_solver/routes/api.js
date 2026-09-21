'use strict';

const { json } = require('body-parser');
const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      var puzz = req.body.puzzle;
      if (!puzz) {
        return res.json({
          "error": "Required field(s) missing"
        })
      }
      var result = solver.validate(puzz);
      if (result !== puzz) {
        return res.json({
          "error": result
        })
      }
      var cor = req.body.coordinate;
      var val = req.body.value;
      if (!cor || !val) {
        return res.json({
          "error": "Required field(s) missing"
        })
      }
      var regex = /^[a-i][1-9]/i;
      if (cor.match(regex) && cor.length === 2){
        // index of the suduko is row to power (row - 1) sum column subtract 1
        var conflict = new Array();
        if (val.length === 1 && val.match(/[1-9]/)) {
          var rowN = getRow(cor[0])
          var index = 9*(parseInt(rowN)-1)+parseInt(cor[1]);
          if (puzz[index-1] === val) {
            return  res.json({
              "valid": true
            })
          } else {
            var row = solver.checkRowPlacement(result, cor[0], cor[1], val);
            var col = solver.checkColPlacement(result, cor[0], cor[1], val);
            var reg = solver.checkRegionPlacement(result, cor[0], cor[1], val);
            if (row !== false) {
              conflict.push("row");
            }
            if (col !== false) {
              conflict.push("column")
            }
            if (reg !== false) {
              conflict.push("region");
            }
            if (conflict.length == 0) {
              return res.json({
                "valid": true
              })
            } else {
              return res.json({
                "valid": false,
                "conflict": conflict
              })
            }
          } 
        } else {
          return res.json({
            "error": "Invalid value"
          })
        }
      } else {
          return res.json({
            "error": "Invalid coordinate"
          })
        }
      
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      var puzz = req.body.puzzle;
      if (!puzz) {
        return res.json({
          "error": 'Required field missing'
        })
      }
      var result = solver.validate(puzz);
      if (result !== puzz) {
        return res.json({
          "error": result
        })
      } else {
        var puzzString = solver.solve(puzz);
        if (puzzString.match(/[.]/)) {
          return res.json({
            "error": "Puzzle cannot be solved"
          })
        } else {
          return res.json({
            "solution": puzzString
          });
        }
      }
    });
};

function getRow(row) {
  var rowN = row.toUpperCase();
    var row = 0;
    switch (rowN) {
      case "A":
        return 1;
      case "B":
        return 2;
      case "C":
        return 3;
      case "D":
        return 4;
      case "E":
        return 5;
      case "F":
        return 6;
      case "G":
        return 7;
      case "H":
        return 8;
      case "I":
        return 9;
    }
}