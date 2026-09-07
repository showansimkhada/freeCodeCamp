"""
Build a Range of Numbers Generator
In this lab, you will build a range_of_numbers function that uses recursion to generate a list of numbers within a specified range.

For example:

range_of_numbers(3, 9) should return [3, 4, 5, 6, 7, 8, 9].
range_of_numbers(5, 5) should return [5].
Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should create a function named range_of_numbers with two parameters named start_num and end_num.
The function should return a list of consecutive integers that begins with start_num and ends with end_num, including both values.
The value of start_num will always be less than or equal to end_num.
Your function should use recursion by calling itself.
Your function should not use for or while loops, comprehensions, or the range() function.
When start_num equals end_num, the function should return a list containing start_num. This is the base case.
For the recursive case, the function should call itself with an argument that moves toward the base case, then add the current number to the returned list.
The function should not use global variables to store the returned list.
Tests:

Passed: 1. You should have a function named range_of_numbers with parameters named start_num and end_num.
Passed: 2. range_of_numbers(1, 5) should return [1, 2, 3, 4, 5].
Passed: 3. range_of_numbers(6, 9) should return [6, 7, 8, 9].
Passed: 4. range_of_numbers(4, 4) should return [4].
Passed: 5. range_of_numbers(10, 15) should return [10, 11, 12, 13, 14, 15].
Passed: 6. Your range_of_numbers function should call itself.
Passed: 7. Your range_of_numbers function should not use loops, comprehensions, or the range() function.
Passed: 8. Calling range_of_numbers(1, 3) should not affect a later call. After that call, range_of_numbers(6, 9) should still return [6, 7, 8, 9].
"""


def range_of_numbers(start_num, end_num):
  if end_num < start_num:
      return []
  range_of_num = range_of_numbers(start_num + 1, end_num)
  range_of_num.insert(0,start_num)
  return range_of_num

print(range_of_numbers(6, 9))