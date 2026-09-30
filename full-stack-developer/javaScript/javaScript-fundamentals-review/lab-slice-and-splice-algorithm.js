/*
Implement the Slice and Splice Algorithm
In this lab, you will need to create an algorithm to merge two arrays.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

Create a frankenSplice function that accepts two arrays and an index.
Copy each element of the first array into the second array, in order, beginning at the given index, and return the resulting array.
The input arrays should remain the same after the function runs.
Tests:

Passed: 1. frankenSplice([1, 2, 3], [4, 5], 1) should return [4, 1, 2, 3, 5].
Passed: 2. frankenSplice([1, 2], ["a", "b"], 1) should return ["a", 1, 2, "b"].
Passed: 3. frankenSplice(["claw", "tentacle"], ["head", "shoulders", "knees", "toes"], 2) should return ["head", "shoulders", "claw", "tentacle", "knees", "toes"].
Passed: 4. All elements from the first array should be added to the second array in their original order. frankenSplice([1, 2, 3, 4], [], 0) should return [1, 2, 3, 4].
Passed: 5. The first array should remain the same after the function runs.
Passed: 6. The second array should remain the same after the function runs.
*/

function frankenSplice (arr1, arr2, num) {
  let arr = arr2.slice(0, num)
  arr.push(...arr1)
  arr.push(...arr2.slice(num))
  return arr
}