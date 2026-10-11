/*
Design a Sum All Numbers Algorithm
In this lab, you will need to design a sum all numbers algorithm.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should have a function named sumAll that accepts an array of two numbers.
sumAll([n, m]) should return the sum of n and m plus the sum of all the numbers between them. The lowest number will not always come first. For example, sumAll([4,1]) should return 10 because sum of all the numbers between 1 and 4 (both inclusive) is 10.
Tests:

Passed: 1. You should have a function named sumAll.
Passed: 2. sumAll([1, 4]) should return a number.
Passed: 3. sumAll([1, 4]) should return 10.
Passed: 4. sumAll([4, 1]) should return 10.
Passed: 5. sumAll([5, 10]) should return 45.
Passed: 6. sumAll([10, 5]) should return 45.
*/

function sumAll([n, m]) {
  let min = n;
  let max = m;
  if (n > m) {
    max = n;
    min = m;
  }
  let sum = 0;
  for (let i = min; i <= max; i++) {
    sum += i;
  }
  return sum;
}