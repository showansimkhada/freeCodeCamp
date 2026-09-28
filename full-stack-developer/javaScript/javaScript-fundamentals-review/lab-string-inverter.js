/*
Build a String Inverter
In this lab, you will build a simple string inverter that reverses the characters of a given string.

For example, "hello" should become "olleh".

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should create a function named reverseString that takes a string as an argument.
The function should return the reversed string.
Tests:

Passed: 1. You should have a function named reverseString.
Passed: 2. reverseString should take a string as an argument.
Passed: 3. reverseString("hello") should return a string.
Passed: 4. reverseString("hello") should return the string olleh.
Passed: 5. reverseString("Howdy") should return the string ydwoH.
Passed: 6. reverseString("Greetings from Earth") should return the string htraE morf sgniteerG.
*/

function reverseString(string) {
  let newStr = ''
  const arr = string.split('');
  for (let i = arr.length-1; i >= 0; i--) {
    newStr += arr[i]
  }
  return newStr
}