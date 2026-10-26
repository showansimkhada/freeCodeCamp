/*
Build an All-True Property Validator
In this lab you will test a specific property of each object in an array to see if it always has a truthy value or not.

For example, you could be asked to test one property of the objects in an array like the following:

[{
    name: "Quincy",
    role: "Founder",
    isBot: false
}, {
    name: "Naomi",
    role: "",
    isBot: false
}, {
    name: "Camperbot",
    role: "Bot",
    isBot: true
}]
If you were asked to test the name property, in the objects of this array the property name has the values of "Quincy", "Naomi", and "Camperbot", so it is always truthy.

If you were asked to test the role property, the values are "Founder", "", and "Bot", in this case "" is a falsy value, so the values are not always truthy.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should have a function named truthCheck.
The truthCheck function takes two arguments: an array of objects and a string representing a property name found in those objects.
The function should check if the property with the name equal to the second argument has a truthy value in all the objects of the array, and return true if it has, and false otherwise.
Tests:
Passed:1. truthCheck([{name: "Quincy", role: "Founder", isBot: false}, {name: "Naomi", role: "", isBot: false}, {name: "Camperbot", role: "Bot", isBot: true}], "isBot") should return false.
Passed:2. truthCheck([{name: "Quincy", role: "Founder", isBot: false}, {name: "Naomi", role: "", isBot: false}, {name: "Camperbot", role: "Bot", isBot: true}], "name") should return true.
Passed:3. truthCheck([{name: "Quincy", role: "Founder", isBot: false}, {name: "Naomi", role: "", isBot: false}, {name: "Camperbot", role: "Bot", isBot: true}], "role") should return false.
Passed:4. truthCheck([{name: "Pikachu", number: 25, caught: 3}, {name: "Togepi", number: 175, caught: 1}], "number") should return true.
Passed:5. truthCheck([{name: "Pikachu", number: 25, caught: 3}, {name: "Togepi", number: 175, caught: 1}, {name: "MissingNo", number: NaN, caught: 0}], "caught") should return false.
Passed:6. truthCheck([{name: "Pikachu", number: 25, caught: 3}, {name: "Togepi", number: 175, caught: 1}, {name: "MissingNo", number: NaN, caught: 0}], "number") should return false.
Passed:7. truthCheck([{name: "Quincy", username: "QuincyLarson"}, {name: "Naomi", username: "nhcarrigan"}, {name: "Camperbot"}], "username") should return false.
Passed:8. truthCheck([{name: "freeCodeCamp", users: [{name: "Quincy"}, {name: "Naomi"}]}, {name: "Code Radio", users: [{name: "Camperbot"}]}, {name: "", users: []}], "users") should return true.
Passed:9. truthCheck([{id: 1, data: {url: "https://freecodecamp.org", name: "freeCodeCamp"}}, {id: 2, data: {url: "https://coderadio.freecodecamp.org/", name: "CodeRadio"}}, {id: null, data: {}}], "data") should return true.
Passed:10. truthCheck([{id: 1, data: {url: "https://freecodecamp.org", name: "freeCodeCamp"}}, {id: 2, data: {url: "https://coderadio.freecodecamp.org/", name: "CodeRadio"}}, {id: null, data: {}}], "id") should return false.
*/

function truthCheck(collection, pre) {
  let isFalse = true;
  const falseValues = ['', NaN, false, "", 0, -0, 0n, null, undefined]
  for (const obj of collection) {
    for (const [k, v] of Object.entries(obj)) {
      if (!Object.keys(obj).includes(pre)) {
        isFalse = false;
        break
      }
      if(k === pre && falseValues.includes(v)) {
        isFalse = false;
        break
      }
    }
  }
  return isFalse;
}