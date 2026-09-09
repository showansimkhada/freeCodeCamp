/*
Build a Quiz Game
Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should create an array named questions.
The questions array should contain at least five objects, each having the keys category, question, choices, and answer.
The category key should have the value of a string representing a question category.
The question key should have the value of a string representing a question.
The choices key should have the value of an array containing three strings, which are alternative answers to the question.
The answer key should have the value of a string, representing the correct answer to the question. Also, the value of answer should be included in the choices array.
You should have a function named getRandomQuestion that takes an array of questions as a parameter and returns a random question object from the array.
You should have a function named getRandomComputerChoice that takes the array of the available choices as a parameter, and returns a random answer to the selected question.
You should have a function named getResults that takes the question object as the first parameter and the computer's choice as the second parameter. The function should return The computer's choice is correct! if the answer is correct. Otherwise, it returns The computer's choice is wrong. The correct answer is: <correct-answer>, where <correct-answer> is the value of the correct answer to the chosen question.
Tests:

Passed: 1. You should create an array named questions.
Passed: 2. The questions array should contain at least five objects, each having the keys category, question, choices, and answer.
Passed: 3. The category key should have the value of a string representing a question category.
Passed: 4. The question key should have the value of a string representing a question.
Passed: 5. The choices key should have the value of an array containing three strings different from each other.
Passed: 6. The answer key should have the value of a string.
Passed: 7. The value of answer should be included in the choices array.
Passed: 8. You should have a function named getRandomQuestion that takes an array of questions as a parameter and returns a random question object from the array.
Passed: 9. You should have a function named getRandomComputerChoice that takes the array of the available choices as a parameter, and returns a random answer to the selected question.
Passed: 10. You should have a function named getResults.
Passed: 11. Your getResults function should take the question object as the first parameter and the computer's choice as the second parameter.
Passed: 12. If the computer choice matches the answer, getResults should return The computer's choice is correct!
Passed: 13. If the computer choice doesn't match the answer, getResults should return The computer's choice is wrong. The correct answer is: <correct-answer>, where <correct-answer> is the value of the correct answer to the chosen question.
Passed: 14. Your getResults function should use exact equality comparison, not substring matching.
*/
const questions = [
  {
    category: '1',
    question: '1?',
    choices: ['A','B','C'],
    answer: 'B'
  }, {
    category: '2',
    question: '2?',
    choices: ['A','B','C'],
    answer: 'C'
  }, {
    category: '3',
    question: '3?',
    choices: ['A','B','C'],
    answer: 'B'
  }, {
    category: '4',
    question: '4?',
    choices: ['A','B','C'],
    answer: 'A'
  }, {
    category: '5',
    question: '5?',
    choices: ['A','B','C'],
    answer: 'C'
  }
]

const getRandomQuestion = (questions) => {
  const rand = Math.floor(Math.random() * (questions.length))
  console.log(rand)
  return questions[rand]
}

const getRandomComputerChoice = (answers) => {
  const rand = Math.floor(Math.random() * (answers.length))
  console.log(rand)
  return answers[rand]
}

const getResults = (question, answer) => {
  if (question.answer === answer) {
    return `The computer's choice is correct!`
  } else {
    return `The computer's choice is wrong. The correct answer is: ${question.answer}`
  }
}