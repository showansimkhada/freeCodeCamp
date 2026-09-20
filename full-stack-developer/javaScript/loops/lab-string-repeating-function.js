/*
Build a String Repeating Function
In this lab, you will create a function that repeats a given string a specific number of times. For the purpose of this lab, do not use the built-in .repeat() method.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should create a function named repeatStringNumTimes that takes two parameters: a string and a number.
The function should return the string repeated the specified number of times.
If the number is less than or equal to zero, the function should return an empty string.
Tests:

Passed: 1. You should create a function named repeatStringNumTimes.
Passed: 2. repeatStringNumTimes should take two parameters.
Passed: 3. The function repeatStringNumTimes should always return a string.
Passed: 4. repeatStringNumTimes("*", 3) should return the string ***.
Passed: 5. repeatStringNumTimes("abc", 3) should return the string abcabcabc.
Passed: 6. repeatStringNumTimes("abc", 4) should return the string abcabcabcabc.
Passed: 7. repeatStringNumTimes("abc", 1) should return the string abc.
Passed: 8. repeatStringNumTimes("*", 8) should return the string ********.
Passed: 9. repeatStringNumTimes("abc", -2) should return an empty string ("").
Passed: 10. repeatStringNumTimes("abc", 0) should return "".
Passed: 11. The built-in repeat() method should not be used.
*/

const repeatStringNumTimes = (string, num) => {
  if (num <= 0) {
    return ""
  } else {
    let str = ""
    while (num >= 1) {
      str += string
      num--
    }
    return str
  }
}