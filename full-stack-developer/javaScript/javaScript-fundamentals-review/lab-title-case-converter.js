/*
Build a Title Case Converter
In this lab you will create a function that converts a string to title case. Title case means that the first letter of each word is capitalized and the rest of the word is in lower case.

"Web Development Is Awesome" is an example of a title cased string.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should have a titleCase function that takes a string as an argument.
The titleCase function should return a string with the first letter of each word capitalized and the rest of the word in lower case.
titleCase("I like to code") should return "I Like To Code".
titleCase("javaScript is fun") should return "Javascript Is Fun".
Tests:

Passed: 1. You should create a function named titleCase.
Passed: 2. titleCase should take a single argument.
Passed: 3. titleCase("I'm a little tea pot") should return a string.
Passed: 4. titleCase("I'm a little tea pot") should return the string I'm A Little Tea Pot.
Passed: 5. titleCase("sHoRt AnD sToUt") should return the string Short And Stout.
Passed: 6. titleCase("HERE IS MY HANDLE HERE IS MY SPOUT") should return the string Here Is My Handle Here Is My Spout.
*/

function titleCase(string) {
  let words = string.split(' ');
  for (let i = 0; i < words.length; i++) {
    let temp = ''
    for (let j = 0; j < words[i].length; j++) {
      if (j === 0) {
        temp += words[i][j].toUpperCase();
      } else {
        temp += words[i][j].toLowerCase();
      }
    }
    words[i] = temp
  }
  return words.join(' ')
}