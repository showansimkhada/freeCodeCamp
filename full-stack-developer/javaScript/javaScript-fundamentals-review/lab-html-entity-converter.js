/*
Implement an HTML Entity Converter
This lab is about converting special characters in a string with their corresponding HTML entities.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should have a convertHTML function that accepts a string as an argument.
The convertHTML function should return a new string by converting special characters in the argument string to their corresponding HTML entities.

& should be converted to &amp;.
< should be converted to &lt;.
> should be converted to &gt;.
" should be converted to &quot;.
' should be converted to &apos;.
Tests:

Passed: 1. You should have a convertHTML function.
Passed: 2. convertHTML("Dolce & Gabbana") should return the string Dolce &amp; Gabbana.
Passed: 3. convertHTML("Hamburgers < Pizza < Tacos") should return the string Hamburgers &lt; Pizza &lt; Tacos.
Passed: 4. convertHTML("Sixty > twelve") should return the string Sixty &gt; twelve.
Passed: 5. convertHTML('Stuff in "quotation marks"') should return the string Stuff in &quot;quotation marks&quot;.
Passed: 6. convertHTML("Schindler's List") should return the string Schindler&apos;s List.
Passed: 7. convertHTML("<>") should return the string &lt;&gt;.
Passed: 8. convertHTML("abc") should return the string abc.
*/
function convertHTML(string) {
  var result = string;
  for (let i = 0; i < result.length; i++) {
    switch (result[i]) {
      case '&':
        result = result.slice(0, i) + '&amp;' + result.slice(i+1)
        break;
      case '<':
        result = result.slice(0, i) + '&lt;' + result.slice(i+1)
        break;
      case '>':
        result = result.slice(0, i) + '&gt;' + result.slice(i+1)
        break;
      case '"':
        result = result.slice(0, i) + '&quot;' + result.slice(i+1)
        break
      case "'":
        result = result.slice(0, i) + '&apos;' + result.slice(i+1)
        break
    }
  }
  return result
}
