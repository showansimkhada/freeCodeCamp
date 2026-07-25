######################################### 15 August 2025 #########################################
'''
Jbelmud Text
Given a string, return a jumbled version of that string where each word is transformed using the following constraints:

The first and last letters of the words remain in place
All letters between the first and last letter are sorted alphabetically.
The input strings will contain no punctuation, and will be entirely lowercase.
Tests:

Passed: 1. jbelmu("hello world") should return "hello wlord".
Passed: 2. jbelmu("i love jumbled text") should return "i love jbelmud text".
Passed: 3. jbelmu("freecodecamp is my favorite place to learn to code") should return "faccdeeemorp is my 
faiortve pacle to laern to cdoe".
Passed: 4. jbelmu("the quick brown fox jumps over the lazy dog") should return "the qciuk borwn fox jmpus oevr 
the lazy dog".
'''
def jbelmu(text):
    words = text.split(' ')
    x = ''
    for word in words:
        if len(word) == 1:
            x += word + ' '
        else:
            letters = list(word)
            sorted_letters = sorted(letters[1:-1])
            x += letters[0] + ''.join(sorted_letters) + letters[-1] + ' '
    print(x)
    return x.lower().strip()

jbelmu("hello world")
jbelmu("i love jumbled text")
jbelmu("freecodecamp is my favorite place to learn to code")
jbelmu("the quick brown fox jumps over the lazy dog")