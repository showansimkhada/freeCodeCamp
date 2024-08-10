class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString.length === 81) {
      // ^ means don't search for 1-9 and .
      var regex = /[^1-9.]/g;
      if (puzzleString.match(regex)) {
        return "Invalid characters in puzzle";
      } else {
        return puzzleString;
      }
    } else {
      return "Expected puzzle to be 81 characters long";
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    // get only row
    var rowN = row.toUpperCase();
    var s = -1
    var e = 1;
    switch (rowN) {
      case "A":
        s = 0;
        e = 1*9;
        break;
      case "B":
        s = 9;
        e = 2*9;
        break;
      case "C":
        s = 18;
        e = 3*9;
        break;
      case "D":
        s = 27;
        e = 4*9;
        break;
      case "E":
        s = 36;
        e = 5*9;
        break;
      case "F":
        s = 45;
        e = 6*9;
        break;
      case "G":
        s = 54;
        e = 7*9;
        break;
      case "H":
        s = 63;
        e = 8*9;
        break;
      case "I":
        s = 72;
        e = 9*9;
        break;
    }
    var rowEl = puzzleString.slice(s, e);
    var regex = new RegExp(value)
    if (value === 0) {
      return rowEl;
    }
    if (rowEl.match(regex)) {
      return true;
    } else {
      return false;
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    var colN = column;
    var colEl = "";
    switch (colN) {
      case "1":
        colEl = puzzleString[0+9*0] + 
                puzzleString[0+9*1] +
                puzzleString[0+9*2] +
                puzzleString[0+9*3] +
                puzzleString[0+9*4] +
                puzzleString[0+9*5] +
                puzzleString[0+9*6] +
                puzzleString[0+9*7] +
                puzzleString[0+9*8]
        break;
      case "2":
        colEl = puzzleString[1+9*0] + 
                puzzleString[1+9*1] +
                puzzleString[1+9*2] +
                puzzleString[1+9*3] +
                puzzleString[1+9*4] +
                puzzleString[1+9*5] +
                puzzleString[1+9*6] +
                puzzleString[1+9*7] +
                puzzleString[1+9*8]
        break;
      case "3":
        colEl = puzzleString[2+9*0] + 
                puzzleString[2+9*1] +
                puzzleString[2+9*2] +
                puzzleString[2+9*3] +
                puzzleString[2+9*4] +
                puzzleString[2+9*5] +
                puzzleString[2+9*6] +
                puzzleString[2+9*7] +
                puzzleString[2+9*8]
        break;
      case "4":
        colEl = puzzleString[3+9*0] + 
                puzzleString[3+9*1] +
                puzzleString[3+9*2] +
                puzzleString[3+9*3] +
                puzzleString[3+9*4] +
                puzzleString[3+9*5] +
                puzzleString[3+9*6] +
                puzzleString[3+9*7] +
                puzzleString[3+9*8]
        break;
      case "5":
        colEl = puzzleString[4+9*0] + 
                puzzleString[4+9*1] +
                puzzleString[4+9*2] +
                puzzleString[4+9*3] +
                puzzleString[4+9*4] +
                puzzleString[4+9*5] +
                puzzleString[4+9*6] +
                puzzleString[4+9*7] +
                puzzleString[4+9*8]
        break;
      case "6":
        colEl = puzzleString[5+9*0] + 
                puzzleString[5+9*1] +
                puzzleString[5+9*2] +
                puzzleString[5+9*3] +
                puzzleString[5+9*4] +
                puzzleString[5+9*5] +
                puzzleString[5+9*6] +
                puzzleString[5+9*7] +
                puzzleString[5+9*8]
        break;
      case "7":
        colEl = puzzleString[6+9*0] + 
                puzzleString[6+9*1] +
                puzzleString[6+9*2] +
                puzzleString[6+9*3] +
                puzzleString[6+9*4] +
                puzzleString[6+9*5] +
                puzzleString[6+9*6] +
                puzzleString[6+9*7] +
                puzzleString[6+9*8]
        break;
      case "8":
        colEl = puzzleString[7+9*0] + 
                puzzleString[7+9*1] +
                puzzleString[7+9*2] +
                puzzleString[7+9*3] +
                puzzleString[7+9*4] +
                puzzleString[7+9*5] +
                puzzleString[7+9*6] +
                puzzleString[7+9*7] +
                puzzleString[7+9*8]
        break;
      case "9":
        colEl = puzzleString[8+9*0] + 
                puzzleString[8+9*1] +
                puzzleString[8+9*2] +
                puzzleString[8+9*3] +
                puzzleString[8+9*4] +
                puzzleString[8+9*5] +
                puzzleString[8+9*6] +
                puzzleString[8+9*7] +
                puzzleString[8+9*8]
        break;
    }
    var regex = new RegExp(value)
    //console.log(colEl);
    if (colEl.match(regex)) {
      return true;
    }
    if (value === 0) {
      return colEl;
    }
    return false;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    var rowN = row.toUpperCase();
    var colN = column;
    var s = -1;
    switch (rowN) {
      case "A":
      case "B":
      case "C":
        s = 1;
        break;
      case "D": 
      case "E":
      case "F":
        s = 28;
        break;
      case "G":
      case "H":
      case "I":
        s = 55;
        break;
    }
    var regEl = "";
    switch (colN) {
      case "1":
      case "2":
      case "3":
        regEl = puzzleString[s+1-2] + 
                puzzleString[s+2-2] +
                puzzleString[s+3-2] +
                puzzleString[s+10-2] +
                puzzleString[s+11-2] +
                puzzleString[s+12-2] +
                puzzleString[s+19-2] +
                puzzleString[s+20-2] +
                puzzleString[s+21-2]
        break;
      case "4":
      case "5":
      case "6":
        regEl = puzzleString[s+4-2] + 
                puzzleString[s+5-2] +
                puzzleString[s+6-2] +
                puzzleString[s+13-2] +
                puzzleString[s+14-2] +
                puzzleString[s+15-2] +
                puzzleString[s+22-2] +
                puzzleString[s+23-2] +
                puzzleString[s+24-2]
        break;
      case "7":
      case "8":
      case "9":
        regEl = puzzleString[s+7-2] + 
                puzzleString[s+8-2] +
                puzzleString[s+9-2] +
                puzzleString[s+16-2] +
                puzzleString[s+17-2] +
                puzzleString[s+18-2] +
                puzzleString[s+25-2] +
                puzzleString[s+26-2] +
                puzzleString[s+27-2]
        break;
    }
    var regex = new RegExp(value);
    //console.log(regEl);
    if (regEl.match(regex)) {
      return true;
    }
    if (value === 0) {
      return regEl;
    }
    return false;
  }

  solve(puzzleString) {
    /*if((/[.]/).test(puzzleString) === false) {
      return puzzleString;
    }*/
    var puzz = puzzleString;
    let rowArr = ["A", "D", "G"];
    let colArr = [1, 4, 7];
    let numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let y = 0;
    for (let k = 0; k < 9; k++) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let count = 0;
          let regComb = this.getReg(rowArr[i], colArr[j]);
          let row = regComb[0];
          let col = regComb[1];
          var puzzSplit = puzz.split('');
          let x = -1;
          let index = -1;
          for (let m = 0; m < 3; m++) {
            for (let n = 0; n < 3; n++) {
              index = 9 * (parseInt(getRow(row[m].toString()))-1)+parseInt(col[n]);
              //console.log((index-1) + " of index is an element " + puzz[index-1]);
              if (puzz[index-1] === '.') {
                let regC = this.checkRegionPlacement(puzz, row[m].toString(), col[n].toString(), numArr[k]);
                if (regC === false) {
                  let rowC = this.checkRowPlacement(puzz, row[m].toString(), col[n].toString(), numArr[k]);
                  if (rowC === false) {
                    let colC = this.checkColPlacement(puzz, row[m].toString(), col[n].toString(), numArr[k]);
                    if (colC === false ) {
                      count++;
                      x = index-1;
                    }
                  }
                }
              }
            }
          }
          if (count === 1) {
            puzzSplit[x] = numArr[k].toString();
            puzz = puzzSplit.join('').toString();
            y++;
          }
        }
      }
      if (y > 0) {
        k--;
        y = 0;
      }
    }
    if (puzz !== puzzleString) {
      return this.solve(puzz);
    }
    return puzz;
  }

  getReg(rowArr, colArr) {
    let row = rowArr.toString();
    let col = colArr;
    switch (row) {
      case "A":
        rowArr = ["A", "B", "C"];
        break;
      case "D":
        rowArr = ["D", "E", "F"];
        break;
      case "G":
        rowArr = ["G", "H", "I"];
        break;
    }
    switch (col) {
      case 1:
        colArr = [1, 2, 3];
        break;
      case 4:
        colArr = [4, 5, 6];
        break;
      case 7:
        colArr = [7, 8, 9];
        break;
    }
    return [rowArr, colArr];
  }
}

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

module.exports = SudokuSolver;