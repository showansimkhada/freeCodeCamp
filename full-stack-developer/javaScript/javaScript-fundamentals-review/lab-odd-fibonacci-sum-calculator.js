/*
Build an Odd Fibonacci Sum Calculator
In this lab you will build an odd Fibonacci sum calculator that computes the sum of all odd Fibonacci numbers that are less than or equal to a given positive integer.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should have a sumFibs function that accepts a number as an argument.
The sumFibs function should return the sum of all odd Fibonacci numbers that are less than or equal to the given number.
The Fibonacci sequence starts with 0 and 1, and each subsequent number is the sum of the two previous ones.
Only the odd Fibonacci numbers should be added to the sum.
Tests:

Passed: 1. You should have a sumFibs function.
Passed: 2. sumFibs(1) should return a number.
Passed: 3. sumFibs(1000) should return 1785.
Passed: 4. sumFibs(4000000) should return 4613732.
Passed: 5. sumFibs(4) should return 5.
Passed: 6. sumFibs(75024) should return 60696.
Passed: 7. sumFibs(75025) should return 135721.
*/

function sumFibs(num) {
  let sum = 0;
  let fib = [1, 1];
  for (let i = 0; i < num; i++) {
    fib.push(fib[i]+fib[i+1])
  }
  for (const a of fib) {
    if (a%2 !== 0 && a <= num) {
      sum += a
    }
  }
  return sum
}