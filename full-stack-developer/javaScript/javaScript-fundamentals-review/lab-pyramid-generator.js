/*
Build a Pyramid Generator
Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should have a function named pyramid that takes three arguments.
The first argument should be a string representing the pattern character to repeat in your pyramid.
The second argument should be an integer representing the number of rows in the pyramid.
The third argument should be a Boolean value.
The pyramid function should return a string in which the pattern character is repeated and arranged to form a pyramid having the vertex facing upwards when the third argument is false.
When the third argument is true the pyramid should have the vertex facing downwards.
The vertex row should have a single pattern character, and each other row should have two pattern characters more than the previous one.
Each row should start with a number of spaces sufficient to put the center character of each row in the same column and there should not be any spaces at the end of each row.
The pyramid should start and end with a newline character.
For example, calling pyramid("o", 4, false) should give this output:


   o
  ooo
 ooooo
ooooooo

Tests:

Passed: 1. You should have a function named pyramid.
Passed: 2. Your pyramid function should have three parameters.
Passed: 3. pyramid("o", 4, false) should return "\n   o\n  ooo\n ooooo\nooooooo\n".
Passed: 4. pyramid("p", 5, true) should return "\nppppppppp\n ppppppp\n  ppppp\n   ppp\n    p\n".
*/

function pyramid(str, row, bool) {
  let newStr = '\n';
  let n = 2*row-1;
  if (bool) {
    for (let i = row; i > 0; i--) {
      let result = str.repeat(i*2-1);
      newStr += result.padStart(result.length + Math.floor((n-result.length)/2), ' ') + '\n'
    }
    return newStr
  } else {
    for (let i = 1; i <= row; i++) {
      let result = str.repeat(i*2-1);
      newStr += result.padStart(result.length + Math.floor((n-result.length)/2), ' ') + '\n'
    }
    return newStr
  }
}