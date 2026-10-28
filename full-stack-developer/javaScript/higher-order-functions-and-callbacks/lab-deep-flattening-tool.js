/*
Create a Deep Flattening Tool
In this lab, you will be implementing an array flattening algorithm.

Flattening an array means turning a nested array of any depth into a single, one-dimensional array. The process extracts all elements in order, unwrapping only arrays. Other types are left unchanged.

For example:

Original	Flattened
[[1], [], [2, [3]]]	[1, 2, 3]
[1, {"foo": "bar"}, [2]]	[1, {"foo": "bar"}, 2]
["baz", [1, 2], {}]	["baz", 1, 2, {}]
Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should have a function named steamrollArray.
The steamrollArray function should accept one argument: a nested array.
The function should flatten the nested array, accounting for varying levels of nesting.
Your solution should not use the Array.prototype.flat() or Array.prototype.flatMap() methods.
Global variables should not be used.
Tests:
Passed:1. You should have a steamrollArray function.
Passed:2. steamrollArray([[["a"]], [["b"]]]) should return ["a", "b"].
Passed:3. steamrollArray([1, [2], [3, [[4]]]]) should return [1, 2, 3, 4].
Passed:4. steamrollArray([1, [], [3, [[4]]]]) should return [1, 3, 4].
Passed:5. steamrollArray([1, {}, [3, [[4]]]]) should return [1, {}, 3, 4].
Passed:6. Your solution should not use the Array.prototype.flat() or Array.prototype.flatMap() methods.
Passed:7. You should not use global variables.
*/

function steamrollArray(array) {
  const result = [];
  const stack = [...array]
  while (stack.length) {
    const current = stack.pop();
    if (Array.isArray(current)) {
      stack.push(...current);
    } else {
      result.unshift(current);
    }
  }
  return result;
}