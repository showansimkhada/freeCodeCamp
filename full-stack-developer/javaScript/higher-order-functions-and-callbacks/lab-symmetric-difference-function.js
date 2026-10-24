/*
Build a Symmetric Difference Function
Compare two arrays and return a new array with any items found in only one of the two given arrays, but not both. In other words, return the symmetric difference of the two arrays.

Example:

Array A: ["diamond", "stick", "apple"]

Array B: ["stick", "emerald", "bread"]

Result: ["diamond", "apple", "emerald", "bread"]

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

Your function diffArray should return an array.
Your function should take two arguments, both of which are arrays.
Your function should make use of the filter method.
Your function should return the symmetric difference of the two arrays.
Your function should return an empty array if there is no symmetric difference.
Your function should list the items found only in the first array before the items found only in the second array, preserving their original order within each array.
Tests:
Passed:1. You should have a function named diffArray.
Passed:2. Your diffArray function should use the filter method.
Passed:3. diffArray(["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"], ["diorite", "andesite", "grass", "dirt", "dead shrub"]) should return ["pink wool"].
Passed:4. diffArray(["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"], ["andesite", "grass", "dirt", "dead shrub"]) should return ["diorite", "pink wool"].
Passed:5. diffArray(["andesite", "grass", "dirt", "dead shrub"], ["andesite", "grass", "dirt", "dead shrub"]) should return [].
Passed:6. diffArray(["pen", "book"], ["book", "pencil", "notebook"]) should return ["pen", "pencil", "notebook"].
Passed:7. diffArray(["car", "bike", "bus"], ["bike", "train", "plane", "bus"]) should return ["car", "train", "plane"].
Passed:8. diffArray(["apple", "orange"], ["apple", "orange", "banana", "grape"]) should return ["banana", "grape"].
Passed:9. diffArray([], ["apple", "banana"]) should return ["apple", "banana"].
Passed:10. diffArray(["apple", "banana"], []) should return ["apple", "banana"].
Passed:11. diffArray([], []) should return [].
*/

function diffArray(arrayA, arrayB) {
  const resultA = [...arrayA.map(x => x).filter(x => !arrayB.includes(x))];
  const resultB = [...arrayB.map(x => x).filter(x => !arrayA.includes(x))];
  const result = [...resultA, ...resultB];
  return result;
}