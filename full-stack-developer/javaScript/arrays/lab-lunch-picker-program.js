/*
Build a Lunch Picker Program
In this lab, you'll build a program that helps in managing lunch options. You'll work with an array of lunches, add and remove items from the array, and randomly select a lunch option.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should create a lunches variable and assign it an empty array that will be used to store lunch items.
You should create a function addLunchToEnd that takes an array as the first argument and a string as the second argument. The function should:

Add the string to the end of the array.
Log the string [Lunch Item] added to the end of the lunch menu. to the console, where [Lunch Item] is the string passed to the function.
Return the updated array.
You should create a function addLunchToStart that takes an array as the first argument and a string as the second argument. The function should:

Add the string to the start of the array.
Log the string [Lunch Item] added to the start of the lunch menu. to the console, where [Lunch Item] is the string passed to the function.
Return the updated array.
You should create a function removeLastLunch that takes an array as its argument. The function should:

Remove the last element from the array.
If the removal is successful, log the string [Lunch Item] removed from the end of the lunch menu. to the console, where [Lunch Item] is the element removed from the array.
If the array is empty, log the string "No lunches to remove." to the console.
Return the updated array.
You should create a function removeFirstLunch that takes an array as its argument. The function should:

Remove the first element from the array.
If the removal is successful, log the string [Lunch Item] removed from the start of the lunch menu. to the console, where [Lunch Item] is the element removed from the array.
If the array is empty, log the string "No lunches to remove." to the console.
Return the updated array.
You should create a function getRandomLunch that takes an array as its argument. The function should:

Select a random element from the array.
If successful, log the string Randomly selected lunch: [Lunch Item] to the console, where [Lunch Item] is a random element in the array.
If the array is empty, log the string "No lunches available." to the console.
You should create a function showLunchMenu that takes an array as its argument and:

If there are elements in the array, logs the string Menu items: [Lunch Item], [Lunch Item]... to the console, where each [Lunch item] is one of the elements in the array, in order.
If the array is empty, logs the string "The menu is empty." to the console.
Tests:

Passed: 1. You should declare a variable lunches and assign it an empty array to store the lunch items.
Passed: 2. You should define a function addLunchToEnd.
Passed: 3. The function addLunchToEnd should have two parameters.
Passed: 4. addLunchToEnd(lunches, "Tacos") should log the string "Tacos added to the end of the lunch menu." to the console.
Passed: 5. addLunchToEnd(["Pizza", "Tacos"], "Burger") should return ["Pizza", "Tacos", "Burger"].
Passed: 6. You should define a function addLunchToStart.
Passed: 7. The function addLunchToStart should have two parameters.
Passed: 8. addLunchToStart(lunches, "Sushi") should log the string "Sushi added to the start of the lunch menu." to the console.
Passed: 9. addLunchToStart(["Burger", "Sushi"], "Pizza") should return ["Pizza", "Burger", "Sushi"].
Passed: 10. You should define a function removeLastLunch.
Passed: 11. The function removeLastLunch should have one parameter.
Passed: 12. When the input array is empty, the function removeLastLunch should log the string "No lunches to remove." to the console.
Passed: 13. removeLastLunch(["Stew", "Soup", "Toast"]) should log the string "Toast removed from the end of the lunch menu." to the console.
Passed: 14. removeLastLunch(["Sushi", "Pizza", "Noodles"]) should return ["Sushi", "Pizza"].
Passed: 15. You should define a function removeFirstLunch.
Passed: 16. The function removeFirstLunch should have a single parameter.
Passed: 17. When the input array is empty, the function removeFirstLunch should log the string "No lunches to remove." to the console.
Passed: 18. removeFirstLunch(["Salad", "Eggs", "Cheese"]) should log the string "Salad removed from the start of the lunch menu." to the console.
Passed: 19. removeFirstLunch(["Sushi", "Pizza", "Burger"]) should return ["Pizza", "Burger"].
Passed: 20. addLunchToEnd, addLunchToStart, removeLastLunch, and removeFirstLunch should return the same array passed as an argument after updating it.
Passed: 21. You should define a function getRandomLunch.
Passed: 22. The function getRandomLunch should have a single parameter.
Passed: 23. When the input array is empty, the function getRandomLunch should log the string "No lunches available." to the console.
Passed: 24. When the input array is not empty, the function getRandomLunch should log a string in the format Randomly selected lunch: [Lunch Item] to the console.
Passed: 25. The getRandomLunch function should not change the array passed to it as argument.
Passed: 26. You should define a function showLunchMenu.
Passed: 27. The function showLunchMenu should have a single parameter.
Passed: 28. When the input array is empty, the function showLunchMenu should log the string "The menu is empty." to the console.
Passed: 29. showLunchMenu(["Greens", "Corns", "Beans"]) should log "Menu items: Greens, Corns, Beans" to the console.
Passed: 30. showLunchMenu(["Pizza", "Burger", "Fries", "Salad"]) should log "Menu items: Pizza, Burger, Fries, Salad" to the console.
*/
var lunches = [];

function addLunchToEnd(list, str) {
  list.push(str)
  console.log(`${str} added to the end of the lunch menu.`)
  return list
}

function addLunchToStart(list, str) {
  list.unshift(str)
  console.log(`${str} added to the start of the lunch menu.`)
  return list
}

function removeLastLunch(list) {
  if (list.length != 0) {
    let item = list.pop()
    console.log(`${item} removed from the end of the lunch menu.`)
  } else {
    console.log('No lunches to remove.')
  }
  return list
}

function removeFirstLunch(list) {
  if (list.length != 0) {
    let item = list.shift()
    console.log(`${item} removed from the start of the lunch menu.`)
  } else {
    console.log('No lunches to remove.')
  }
  return list
}

function getRandomLunch(list) {
  if (list.length == 0) {
    console.log("No lunches available.")
  }
  const min = 0
  const max = list.length - 1
  const rand = Math.floor(Math.random() * (max - min + 1) + min)
  console.log(`Randomly selected lunch: ${list[rand]}`)
  return list
}

function showLunchMenu(list) {
  if (list.length == 0) {
    console.log("The menu is empty.")
  }
  else {
    var string = "Menu items: "
    for (let i = 0; i < list.length; i++) {
      string += list[i]
      if (i < list.length - 1) {
        string += ', '
      }
    }
    console.log(string)
  }
}