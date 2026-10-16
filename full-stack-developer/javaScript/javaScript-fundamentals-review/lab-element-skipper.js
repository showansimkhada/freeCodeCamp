/*
Implement an Element Skipper
In this lab you will create a function that skips elements in an array until it finds an acceptable one based on a specific test function.

For example, for an array like [1, 1, 1, 2, 1, 1, 1] and a test function function(n) {return n === 2}, the first element that is acceptable for this is the one at index 3, so all the elements before that need to be discarded, and the output should be the remaining elements [2, 1, 1, 1].

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should have a dropElements function that accepts an array (arr) and a function (func) as arguments.
The dropElements function should iterate through the array and remove elements starting from the first one until func returns true for an element.
The dropElements function should return the remaining elements in the array if the condition is met.
If the condition is never satisfied, it should return an empty array.
Tests:

Passed: 1. You should have a dropElements function.
Passed: 2. dropElements([1, 2, 3, 4], function(n) {return n >= 3;}) should return [3, 4].
Passed: 3. dropElements([0, 1, 0, 1], function(n) {return n === 1;}) should return [1, 0, 1].
Passed: 4. dropElements([1, 2, 3], function(n) {return n > 0;}) should return [1, 2, 3].
Passed: 5. dropElements([1, 2, 3, 4], function(n) {return n > 5;}) should return [].
Passed: 6. dropElements([1, 2, 3, 7, 4], function(n) {return n > 3;}) should return [7, 4].
Passed: 7. dropElements([1, 2, 3, 9, 2], function(n) {return n > 2;}) should return [3, 9, 2].
*/

function dropElements(arr, func) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i])) {
      result = arr.slice(i)
      break
    }
  }
  return result
}