/*
Implement a Unique Sorted Union
Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should have a function named uniteUnique.
The uniteUnique function should accept two or more arrays as arguments.
The function should return a new array that contains unique values from the argument arrays, in the order they are first found in the arguments. For example, an input like [1, 2, 4], [2, 3, 5] would have an output of [1, 2, 4, 3, 5].
Tests:

Passed: 1. You should have a uniteUnique function.
Passed: 2. uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]) should return [1, 3, 2, 5, 4].
Passed: 3. uniteUnique([1, 2, 3], [5, 2, 1]) should return [1, 2, 3, 5].
Passed: 4. uniteUnique([1, 2, 3], [5, 2, 1, 4], [2, 1], [6, 7, 8]) should return [1, 2, 3, 5, 4, 6, 7, 8].
Passed: 5. uniteUnique([1, 3, 2], [5, 4], [5, 6]) should return [1, 3, 2, 5, 4, 6].
Passed: 6. uniteUnique([1, 3, 2, 3], [5, 2, 1, 4], [2, 1]) should return [1, 3, 2, 5, 4].
*/

function uniteUnique(...arrays) {
  let result = [];
  for (let i = 0; i < arrays.length; i++) {
    if (result.length === 0) {
      result = Array.from(new Set(arrays[i]));
      continue
    }
    for (let j = 0; j < arrays[i].length; j++) {
      if (!result.includes(arrays[i][j])) {
        result.push(arrays[i][j])
      }
    }
  }
  return result
}