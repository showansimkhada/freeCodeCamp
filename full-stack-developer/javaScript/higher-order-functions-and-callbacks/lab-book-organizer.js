/*
Build a Book Organizer
Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should have an array of objects named books where each object in the array should have a string title, another string authorName, and a number releaseYear.

Your books array should have a minimum of three objects.

You should have a callback function named sortByYear that accepts two books as parameter for sorting the array.

The sortByYear function should return -1 if the releaseYear of the first book is smaller than that of the second book.

The sortByYear function should return 1 if the releaseYear of the first book is bigger than that of the second book.

The sortByYear function should return 0 if both releaseYear values are equal.

You should filter out books written after a certain year such as 1950 from the books array and save the filtered array in a new array named filteredBooks.

You should sort the books in the filteredBooks array according to their releaseYear in ascending order. You learned in a prior lesson that the sort() method will sort the array in place. This means the filteredBooks array will be mutated.

Tests:
Passed:1. You should have a function sortByYear in your code.
Passed:2. Your sortByYear function should take two parameters.
Passed:3. Your sortByYear function should return -1 if the releaseYear of book1 object is smaller than that of the book2 object, 1 if the releaseYear of book1 object is larger than that of the book2 object, and 0 in all other scenarios.
Passed:4. You should have an array books in your code.
Passed:5. Your books array should have at least three book objects.
Passed:6. Your books array should contain objects each with a string title, another string authorName, and a number releaseYear.
Passed:7. You should have an array filteredBooks in your code.
Passed:8. The filteredBooks array should have some of the books filtered out from the books array and not be empty.
Passed:9. The filteredBooks array should only contain books from the original books array.
Passed:10. The filteredBooks array should include only books released on or before a specified year.
Passed:11. You should call the sort higher order function by passing the sortByYear callback function on the filteredBooks array.
*/

const books = [
  {
    title: 'Your Next Five Moves: Master the Art of Business Strategy',
    authorName: 'Patrick Bet-David and Greg Dinkin',
    releaseYear: 2000,
  },
  {
    title: 'Atomic Habits',
    authorName: 'James Clear',
    releaseYear: 2005,
  },
  {
    title: 'Choose Your Enemies Wisely: Business Planning for the Audacious Few',
    authorName: 'Patrick Bet-David',
    releaseYear: 2009,
  },
  {
    title: 'The Embedded Entrepreneur',
    authorName: 'Arvid Kahl',
    releaseYear: 1940,
  },
  {
    title: 'How to Be a Coffee Bean: 111 Life-Changing Ways to Create Positive Change',
    authorName: 'Jon Gordon',
    releaseYear: 2003,
  },
  {
    title: 'The Creative Mindset: Mastering the Six Skills That Empower Innovation',
    authorName: 'Jeff DeGraff and Staney DeGraff',
    releaseYear: 1880,
  },
  {
    title: 'Rich Dad Poor Dad',
    authorName: 'Robert Kiyosaki and Sharon Lechter',
    releaseYear: 2010,
  },
  {
    title: 'Zero to Sold',
    authorName: 'Arvid Kahl',
    releaseYear: 2007,
  },
];

function sortByYear(bookA, bookB) {
  if (bookA.releaseYear < bookB.releaseYear) {
    return -1
  } else if (bookA.releaseYear > bookB.releaseYear) {
    return 1
  }
  else if (bookA.releaseYear === bookB.releaseYear) {
    return 0
  }
}

const filteredBooks = books.filter(book => book.releaseYear <= 1950);

console.log(filteredBooks.sort(sortByYear))