/*
Build a Golf Score Translator
In the game of Golf, each hole has a par, meaning the average number of strokes a golfer is expected to make in order to sink the ball in the hole to complete the play. Depending on how far above or below par your strokes are, there is a different nickname.

In this lab, you will write a function that converts the par and strokes to their nickname.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should create a function named golfScore.
golfScore should take two numeric arguments, which are the par for the course and the amount of strokes made.
golfScore should return a string.
golfScore should return "Hole-in-one!" if strokes is 1.
golfScore should return "Eagle" if strokes is less than or equal to par minus 2.
golfScore should return "Birdie" if strokes is equal to par minus 1.
golfScore should return "Par" if strokes is equal to par.
golfScore should return "Bogey" if strokes is equal to par plus 1.
golfScore should return "Double Bogey" if strokes is equal to par plus 2.
golfScore should return "Go Home!" if strokes is greater than or equal to par plus 3.
Tests:

Passed: 1. You should create a function named golfScore.
Passed: 2. golfScore should take two parameters.
Passed: 3. golfScore should return a string
Passed: 4. golfScore(1, 1) should return the string Hole-in-one!
Passed: 5. golfScore(3, 1) should return the string Hole-in-one!
Passed: 6. golfScore(4, 1) should return the string Hole-in-one!
Passed: 7. golfScore(5, 1) should return the string Hole-in-one!
Passed: 8. golfScore(4, 2) should return the string Eagle
Passed: 9. golfScore(5, 2) should return the string Eagle
Passed: 10. golfScore(3, 2) should return the string Birdie
Passed: 11. golfScore(4, 3) should return the string Birdie
Passed: 12. golfScore(5, 4) should return the string Birdie
Passed: 13. golfScore(3, 3) should return the string Par
Passed: 14. golfScore(4, 4) should return the string Par
Passed: 15. golfScore(5, 5) should return the string Par
Passed: 16. golfScore(3, 4) should return the string Bogey
Passed: 17. golfScore(4, 5) should return the string Bogey
Passed: 18. golfScore(5, 6) should return the string Bogey
Passed: 19. golfScore(3, 5) should return the string Double Bogey
Passed: 20. golfScore(4, 6) should return the string Double Bogey
Passed: 21. golfScore(5, 7) should return the string Double Bogey
Passed: 22. golfScore(3, 7) should return the string Go Home!
Passed: 23. golfScore(4, 8) should return the string Go Home!
Passed: 24. golfScore(5, 9) should return the string Go Home!
*/

const names = ["Hole-in-one!", "Eagle", "Birdie", "Par", "Bogey", "Double Bogey", "Go Home!"];

function golfScore(par, strokes) {
  switch (true) {
    case (strokes == 1):
      return names[0]
    case (strokes <= par - 2):
      return names[1]
    case (strokes == par - 1):
      return names[2]
    case (strokes == par):
      return names[3]
    case (strokes == par + 1):
      return names[4]
    case (strokes == par + 2):
      return names[5]
    case (strokes >= par + 3):
      return names[6]
  }
}

golfScore(5,2)