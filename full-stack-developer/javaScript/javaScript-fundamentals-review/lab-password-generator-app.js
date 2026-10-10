/*
Build a Password Generator App
In this lab, you'll practice using functions by building a random password generator.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should create a function called generatePassword that takes a parameter, indicating the length of generated password. You can name the parameter whatever you like.
Your function should return a string which represents a randomly generated password. You should use the following string and different Math methods to help you return a new string with random characters in it: ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*().
You should define a variable called password and assign it the result of calling the generatePassword function with a numeric argument that represents the desired password length.
You should have a console.log that logs a single string made by concatenating the message Generated password: and the password variable separated by a space.
Tests:

Passed: 1. You should have a generatePassword function with a parameter. You can name the parameter whatever you like.
Passed: 2. Your generatePassword function should return a string.
Passed: 3. Your generatePassword function should return a new string that is the correct length.
Passed: 4. Your function should return a randomly generated password with valid characters.
Passed: 5. Your function should return a randomly generated password which contains more than one unique character.
Passed: 6. Your function should return a new random string each time it is called.
Passed: 7. You should have a password variable.
Passed: 8. Your password variable should be a string.
Passed: 9. You should call the generatePassword function with a numeric argument and store the returned password in the password variable.
Passed: 10. You should log a single string combining Generated password: and the password separated by a single space using + or a template literal.
*/

function generatePassword(len) {
  const char = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','!','@','#','$','%','^','&','*','(',')'];
  let string = ''
  for (let i = 0; i < len; i++){
    let rand = Math.floor(Math.random() * (char.length));
    string += char[rand];
  }
  return string
}

const password = generatePassword(9)
console.log(`Generated password: ${password}`)