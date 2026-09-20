/*
Build a Profile Lookup
In this lab, you will build a profile lookup that looks up information about people in a contacts list.

For this example imagine there is a contact named Akira Laine, the lookUpProfile("Akira", "lastName") should return Laine.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should create a function named lookUpProfile that takes a name and a property as arguments.
You should retrieve contact information from the provided contacts array.
If the function receives a contact name and the property exists on the related contact, then the property's value should be returned.
If the name passed to the function does not match any contacts in the contacts array, then the function should return "No such contact".
If the property does not exist on a found contact, then the function should return "No such property".
Tests:

Passed: 1. The contacts array should still be present in the global scope. Reset the lesson to recover it if you deleted it.
Passed: 2. You should have a function named lookUpProfile with two parameters.
Passed: 3. lookUpProfile("Kristian", "lastName") should return a string.
Passed: 4. lookUpProfile("Kristian", "lastName") should return the string Vos
Passed: 5. lookUpProfile("Sherlock", "likes") should return ["Intriguing Cases", "Violin"]
Passed: 6. lookUpProfile("Harry", "likes") should return an array
Passed: 7. lookUpProfile("Bob", "number") should return the string No such contact
Passed: 8. lookUpProfile("Bob", "potato") should return the string No such contact
Passed: 9. lookUpProfile("Akira", "address") should return the string No such property
Passed: 10. The contacts array should remain unchanged after running lookUpProfile
*/

let contacts = [
  {
    firstName: "Akira",
    lastName: "Laine",
    number: "0543236543",
    likes: ["Pizza", "Coding", "Brownie Points"],
  },
  {
    firstName: "Harry",
    lastName: "Potter",
    number: "0994372684",
    likes: ["Hogwarts", "Magic", "Hagrid"],
  },
  {
    firstName: "Sherlock",
    lastName: "Holmes",
    number: "0487345643",
    likes: ["Intriguing Cases", "Violin"],
  },
  {
    firstName: "Kristian",
    lastName: "Vos",
    number: "unknown",
    likes: ["JavaScript", "Gaming", "Foxes"],
  },
];

const lookUpProfile = (name, property) => {
  let nameExist = false
  let emt = {}
  for (const people of contacts) {
    if (people.firstName.includes(name)) {
      console.log(people)
      nameExist = true
      emt = {...people}
      break
    }
  }
  if (nameExist) {
    if (emt[property]) {
      return emt[property]
    }
    return "No such property"
  }
  return "No such contact"
}