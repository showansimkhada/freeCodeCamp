/*
Implement a Matching Object Filter
In this lab, you will create a function that filters an array of objects and returns only those objects that match all key-value pairs in a given source object.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should have a whatIsInAName function that accepts two arguments, an array of objects and a source object.
The whatIsInAName function should return a new array containing only the objects from the collection that have all the key–value pairs present in the source object.
If no objects match all the key–value pairs from the source, the function should return an empty array. For example:
whatIsInAName(
  [
    { first: "Romeo", last: "Montague" },
    { first: "Mercutio", last: null },
    { first: "Tybalt", last: "Capulet" }
  ],
  { last: "Capulet" }
);
// should return [{ first: "Tybalt", last: "Capulet" }]
Tests:
Passed:1. You should have a whatIsInAName function.
Passed:2. whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" }) should return [{ first: "Tybalt", last: "Capulet" }].
Passed:3. whatIsInAName([{ "apple": 1 }, { "apple": 1 }, { "apple": 1, "bat": 2 }], { "apple": 1 }) should return [{"apple": 1}, {"apple": 1}, {"apple": 1, "bat": 2}].
Passed:4. whatIsInAName([{ "apple": 1, "bat": 2 }, { "bat": 2 }, { "apple": 1, "bat": 2, "cookie": 2 }], { "apple": 1, "bat": 2 }) should return [{"apple": 1, "bat": 2}, {"apple": 1, "bat": 2, "cookie": 2}].
Passed:5. whatIsInAName([{ "apple": 1, "bat": 2 }, { "apple": 1 }, { "apple": 1, "bat": 2, "cookie": 2 }], { "apple": 1, "cookie": 2 }) should return [{"apple": 1, "bat": 2, "cookie": 2}].
Passed:6. whatIsInAName([{ "apple": 1, "bat": 2 }, { "apple": 1 }, { "apple": 1, "bat": 2, "cookie": 2 }, { "bat": 2 }], { "apple": 1, "bat": 2 }) should return [{"apple": 1, "bat": 2}, {"apple": 1, "bat": 2, "cookie": 2}]
Passed:7. whatIsInAName([{"a": 1, "b": 2, "c": 3}], {"a": 1, "b": 9999, "c": 3}) should return [].
Passed:8. whatIsInAName([{"a": 1, "b": 2, "c": 3, "d": 9999}], {"a": 1, "b": 9999, "c": 3}) should return [].
*/

function whatIsInAName(array, obj) {
  const result = [];
  for (const elem of array) {
    if (Object.keys(obj).every(key => elem.hasOwnProperty(key) && elem[key] === obj[key])) {
      result.push(elem);
    }
  }
  return result;
}