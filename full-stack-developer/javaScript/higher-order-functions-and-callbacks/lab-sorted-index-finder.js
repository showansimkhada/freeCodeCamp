/*
Implement a Sorted Index Finder
In this lab you will create a function that returns the lowest index at which a value should be inserted into an array once it has been sorted in ascending order.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should have a getIndexToIns function that takes two arguments: an array and a number.
You should use the sort method to sort the array in ascending order.
Your getIndexToIns function should return the lowest index at which the number should be inserted by using the findIndex method.
Your getIndexToIns function should always return a number.
Hint:
The findIndex method is a built-in array method in JavaScript. It takes a callback function and returns the index of the first element that satisfies the condition. Both findIndex and sort are higher-order functions.

Examples:

getIndexToIns([1, 2, 3, 4], 1.5) should return 1 because 1.5 is greater than 1 (index 0) and less than 2 (index 1).
getIndexToIns([20, 3, 5], 19) should return 2 because after sorting to [3, 5, 20], 19 is less than 20 (index 2) and greater than 5 (index 1).
Tests:
Passed:1. You should have a getIndexToIns function.
Passed:2. getIndexToIns should always return a number.
Passed:3. Your function should use the sort method.
Passed:4. Your function should make use of the findIndex method.
Passed:5. getIndexToIns([10, 20, 30, 40, 50], 35) should return 3.
Passed:6. getIndexToIns([10, 20, 30, 40, 50], 30) should return 2.
Passed:7. getIndexToIns([40, 60], 50) should return 1.
Passed:8. getIndexToIns([3, 10, 5], 3) should return 0.
Passed:9. getIndexToIns([5, 3, 20, 3], 5) should return 2.
Passed:10. getIndexToIns([2, 20, 10], 19) should return 2.
Passed:11. getIndexToIns([3, 10, 5], 11) should return 3
Passed:12. getIndexToIns([], 5) should return 0
*/

function getIndexToIns(array, num) {
  const sortedArray = array.sort((a, b) => a - b);
  console.log(sortedArray)
  const index = sortedArray.findIndex(elem => elem >= num)
  const n = sortedArray.length
  if (sortedArray[sortedArray.length - 1] < num) {
    return n
  }
  if (index < 0) {
    return 0
  }
  return index
}