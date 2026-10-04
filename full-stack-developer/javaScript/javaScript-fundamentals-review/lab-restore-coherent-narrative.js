/*
Restore a Coherent Narrative from an Array of Story Fragments
In this lab, you will restore a coherent narrative from a corrupted array of story fragments.

You will practice using loops by implementing fundamental array algorithms from scratch.

You will work with arrays of story fragment objects. Each fragment object has the following properties:

Property	Description	Example value
id	A positive integer indicating the fragment's position in the story	3
text	The actual story content	"and I use Arch btw.\""
In this lab, you are provided with a prefilled array called shuffledFragments.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories

You should not change the pre-filled shuffledFragments array.
You should create a function named compactFragments that takes an array of fragments and returns a new array with all undefined elements removed. If the function removes any undefined elements, it should log a message to the console. The message should start with the prefix [COMPACTED].
You should declare a variable named compactedShuffledFragments and assign it the result of calling compactFragments with the shuffledFragments array.
You should create a function named sortFragments that takes an array of fragments without undefined elements and returns a new array sorted by the id property in ascending order, keeping fragments that share the same id in their original order. You should not use JavaScript's built-in sort method.
You should declare a variable named sortedFragments and assign it the result of calling sortFragments with the compactedShuffledFragments array.
You should create a function named dedupeFragments that takes a sorted array of fragments and returns a new array with duplicates removed, keeping only the first occurrence. You should define duplicates as two or more fragments sharing the same id. For each id that is deduplicated, the function should log a message to the console. The message should start with the prefix [DEDUPED].
You should declare a variable named dedupedFragments and assign it the result of calling dedupeFragments with the sortedFragments array.
You should create a function named fillMissingFragments that takes a sorted array of fragments and returns a new array with missing fragments filled with placeholder objects. You should define missing fragments as gaps in the sequence between the lowest and highest id. The placeholder objects should have the format { id: missingId, text: "[...]" }. For each placeholder added, the function should log a message to the console. The message should start with the prefix [FILLED].
You should declare a variable named filledFragments and assign it the result of calling fillMissingFragments with the dedupedFragments array.
You should create a function named assembleStory that takes a sorted array of fragments and returns a single string containing all fragment texts, separated by newlines.
You should use assembleStory with your filledFragments to display the complete story in the console.
Your functions compactFragments, sortFragments, dedupeFragments, fillMissingFragments and assembleStory should not mutate the array that they are called with.
Example

Here is an example of an array containing story fragments:

const exampleArray = [
  { id: 3, text: "and I use Arch btw.\"" },
  ,
  { id: 1, text: "Naomi said:" },
  { id: 3, text: "and I use Arch btw.\"" },
];
After restoring the story from exampleArray, it would look like this:

Naomi said:
[...]
and I use Arch btw."
Tests:

Passed: 1. You should not change the pre-filled shuffledFragments array.
Passed: 2. You should have a compactFragments function.
Passed: 3. compactFragments([{ id: 1, text: "Hello" }, undefined]) should log a message that starts with [COMPACTED].
Passed: 4. When the compactFragments function is called with an array containing undefined elements, it should log a console message that starts with [COMPACTED].
Passed: 5. compactFragments([{ id: 1, text: "Hello" },,]) should log a message that starts with [COMPACTED].
Passed: 6. When the compactFragments function is called with an array containing empty slots, it should log a console message that starts with [COMPACTED].
Passed: 7. When the compactFragments function is called with the array [{ id: 1, text: "Hello" }, { id: 2, text: "World" }], it should not log any console messages that start with [COMPACTED].
Passed: 8. compactFragments([{ id: 1, text: "Hello" }, undefined, { id: 2, text: "World" }]) should return [{ id: 1, text: "Hello" }, { id: 2, text: "World" }].
Passed: 9. compactFragments should not mutate the array passed in.
Passed: 10. compactedShuffledFragments should be an array with no undefined elements.
Passed: 11. You should have a sortFragments function.
Passed: 12. sortFragments([{ id: 30, text: "c" }, { id: 10, text: "a" }, { id: 10, text: "dup" }, { id: 20, text: "b" }]) should return [{ id: 10, text: "a" }, { id: 10, text: "dup" }, { id: 20, text: "b" }, { id: 30, text: "c" }].
Passed: 13. sortFragments should not use the built-in .sort() method.
Passed: 14. sortFragments should not mutate the array passed in.
Passed: 15. sortedFragments should have each element's id less than or equal to the next element's id.
Passed: 16. You should have a dedupeFragments function.
Passed: 17. dedupeFragments([{ id: 1, text: "first" }, { id: 1, text: "dup" }, { id: 2, text: "second" }]) should return [{ id: 1, text: "first" }, { id: 2, text: "second" }].
Passed: 18. dedupeFragments([{ id: 1, text: "a" }, { id: 1, text: "dup" }, { id: 2, text: "b" }, { id: 2, text: "dup" }, { id: 3, text: "c" }]) should log a [DEDUPED] message for each duplicated id.
Passed: 19. dedupeFragments([{ id: 1, text: "a" }, { id: 2, text: "b" }, { id: 2, text: "dup" }]) should log a [DEDUPED] message when the last id is duplicated.
Passed: 20. When dedupeFragments is called with an array containing duplicates, it should log a message starting with [DEDUPED] for each duplicated id.
Passed: 21. dedupeFragments should not mutate the array passed in.
Passed: 22. dedupedFragments should have no duplicate id values.
Passed: 23. You should have a fillMissingFragments function.
Passed: 24. fillMissingFragments([{ id: 1, text: "a" }, { id: 3, text: "c" }]) should return [{ id: 1, text: "a" }, { id: 2, text: "[...]" }, { id: 3, text: "c" }].
Passed: 25. fillMissingFragments([{ id: 1, text: "a" }, { id: 3, text: "c" }]) should log a message that starts with [FILLED].
Passed: 26. When fillMissingFragments adds a placeholder, it should log a message starting with [FILLED].
Passed: 27. fillMissingFragments should not mutate the array passed in.
Passed: 28. filledFragments should have no gaps in the id sequence.
Passed: 29. You should have an assembleStory function.
Passed: 30. assembleStory([{ id: 1, text: "Hello" }, { id: 2, text: "World" }]) should return the string "Hello\nWorld".
Passed: 31. assembleStory should not mutate the array passed in.
Passed: 32. You should call console.log with the result of assembleStory(filledFragments).
*/
const shuffledFragments = [
  { id: 15, text: "and, after a time, passed the place where the Hare was sleeping." },
  { id: 12, text: "he lay down beside the course to take a nap" },
  ,
  { id: 11, text: "and to make the Tortoise feel very deeply how ridiculous it was for him to try a race with a Hare," },
  { id: 7, text: "but for the fun of the thing he agreed." },
  { id: 19, text: "The Hare now ran his swiftest," },
  ,
  { id: 1, text: "A Hare was making fun of the Tortoise one day for being so slow." },
  { id: 14, text: "The Tortoise meanwhile kept going slowly but steadily," },
  { id: 9, text: "marked the distance and started the runners off." },
  ,
  { id: 5, text: "I'll run you a race and prove it.\"" },
  { id: 17, text: "and when at last he did wake up," },
  { id: 2, text: '"Do you ever get anywhere?" he asked with a mocking laugh.' },
  { id: 12, text: "he lay down beside the course to take a nap" },
  ,
  { id: 8, text: "So the Fox, who had consented to act as judge," },
  { id: 20, text: "but he could not overtake the Tortoise in time." },
  { id: 5, text: "I'll run you a race and prove it.\"" },
  { id: 6, text: "The Hare was much amused at the idea of running a race with the Tortoise," },
  ,
  { id: 13, text: "until the Tortoise should catch up." },
  { id: 10, text: "The Hare was soon far out of sight," },
  { id: 12, text: "he lay down beside the course to take a nap" },
  { id: 18, text: "the Tortoise was near the goal." },
];

function compactFragments(array) {
  let result = array.slice()
  if (result.includes(undefined) || result.includes('')) {
    console.log('[COMPACTED]')
    result = result.filter(x => x !== undefined)
    result = result.filter(x => x !== '')
  }
  return result
}

const compactedShuffledFragments = compactFragments(shuffledFragments);

function sortFragments(array) {
  let result = [...array];
  let len = result.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (result[j].id < result[i].id) {
        let temp = result[j]
        result[j] = result[i]
        result[i] = temp
      }
    }
  }
  return result
}

const sortedFragments = sortFragments(compactedShuffledFragments);

function dedupeFragments(array) {
  let result = [...array];
  for (const elem of result) {
    for (let i = 1; i < result.length-1; i++) {
      if (elem.id === result[i].id) {
        console.log('[DEDUPED]')
        result.splice(i, 1)
      }
    }
  }
  return result
}

const dedupedFragments = dedupeFragments(sortedFragments)

function fillMissingFragments(array) {
  let result = [...array];
  let minId = result[0].id;
  for (let i = 0; i < result.length; i++) {
    if (result[i].id !== minId) {
      console.log('[FILLED]')
      result.splice(i, 0, {id: minId, text: '[...]'});
    }
    minId++
  }
  return result
}

const filledFragments = fillMissingFragments(dedupedFragments);

function assembleStory(array) {
  let result = [...array];
  let string = '';
  for (let i = 0; i < result.length; i++) {
    string += result[i].text
    if (i != result.length - 1) {
      string += '\n';
    }
  }
  return string
}

console.log(assembleStory(filledFragments))