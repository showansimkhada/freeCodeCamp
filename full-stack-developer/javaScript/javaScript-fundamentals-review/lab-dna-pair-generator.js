/*
Implement a DNA Pair Generator
In the double helix of the DNA, the bases are always paired together: if on one strand there is an A base, on the other strand directly in front there is a T base, the other pair is C and G.

In this lab, you will write a function to match the missing base pairs for the provided DNA strand. For each character in the provided string, find the base pair character.

For example, for the input ATCG, return [["A", "T"], ["T", "A"], ["C", "G"], ["G", "C"]]

The A base gets paired with a T base, the T base is paired with a A base, the C is paired with the G base, and finally the G base is paired with a C base.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should have a pairElement function that takes a string of any length as an argument.
The pairElement function should return a 2d array, where each inner array has two strings inside, the first string is one base from the input, and the second string the paired base.
When given A, the function should pair it with T.
When given T, the function should pair it with A.
When given C, the function should pair it with G.
When given G, the function should pair it with C.
Tests:

Passed: 1. You should create a function named pairElement.
Passed: 2. pairElement should take a single argument.
Passed: 3. pairElement("ATCGA") should return [["A","T"],["T","A"],["C","G"],["G","C"],["A","T"]].
Passed: 4. pairElement("TTGAG") should return [["T","A"],["T","A"],["G","C"],["A","T"],["G","C"]].
Passed: 5. pairElement("CTCTA") should return [["C","G"],["T","A"],["C","G"],["T","A"],["A","T"]].
*/
function pairElement(string) {
  let result = [];
  for (let i = 0; i < string.length; i++) {
    let pair = []
    switch (string[i]) {
      case 'A':
        pair.push('A');
        pair.push('T');
        result.push(pair);
        break
      case 'T':
        pair.push('T');
        pair.push('A');
        result.push(pair)
        break
      case 'C':
        pair.push('C');
        pair.push('G');
        result.push(pair);
        break
      case 'G':
        pair.push('G');
        pair.push('C');
        result.push(pair)
        break
    }
  }
  return result
}