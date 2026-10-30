/*
Implement a Range-Based LCM Calculator
In this lab, you will create a function that takes an array of two numbers and returns the least common multiple (LCM) of those two numbers and all the numbers between them.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should have a smallestCommons function that accepts an array of two numbers as an argument.
The smallestCommons function should return the smallest common multiple that is evenly divisible by both numbers and all sequential numbers in the range between them.
The function should handle input where the two numbers are not in numerical order.
Tests:
Passed:1. You should have a smallestCommons function.
Passed:2. smallestCommons([1, 5]) should return a number.
Passed:3. smallestCommons([1, 5]) should return 60.
Passed:4. smallestCommons([5, 1]) should return 60.
Passed:5. smallestCommons([2, 10]) should return 2520.
Passed:6. smallestCommons([1, 13]) should return 360360.
Passed:7. smallestCommons([23, 18]) should return 6056820.
*/

function smallestCommons([a, b]) {
  console.log(b,a)
  const min = Math.min(a,b);
  const max = Math.max(a,b);
  const maxFactors = {};
  for (let i = min; i <= max; i++) {
    let current = i;
    const currentFactor = {};
    while (current % 2 === 0) {
      currentFactor[2] = (currentFactor[2] || 0) + 1;
      current /= 2;
    }

    for (let factor = 3; factor * factor <= current; factor += 2) {
      while (current % factor === 0) {
        currentFactor[factor] = (currentFactor[factor] || 0) + 1;
        current /= factor;
      }
    }

    if (current > 1) {
      currentFactor[current] = (currentFactor[current] || 0) + 1;
    }

    for (const prime in currentFactor) {
      maxFactors[prime] = Math.max(maxFactors[prime] || 0, currentFactor[prime]);
    }
  }

  let lcm = 1;
  for (const prime in maxFactors) {
    lcm *= Math.pow(Number(prime), maxFactors[prime]);
  }
  return lcm;
}