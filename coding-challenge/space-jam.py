######################################### 14 August 2025 #########################################
'''
S P A C E J A M
Given a string, remove all spaces from the string, insert two spaces between every character, convert all alphabetical letters to uppercase, and return the result.

Non-alphabetical characters should remain unchanged (except for spaces).
Tests:

Passed: 1. space_jam("freeCodeCamp") should return "F  R  E  E  C  O  D  E  C  A  M  P".
Passed: 2. space_jam("   free   Code   Camp   ") should return "F  R  E  E  C  O  D  E  C  A  M  P".
Passed: 3. space_jam("Hello World?!") should return "H  E  L  L  O  W  O  R  L  D  ?  !".
Passed: 4. space_jam("C@t$ & D0g$") should return "C  @  T  $  &  D  0  G  $".
Passed: 5. space_jam("allyourbase") should return "A  L  L  Y  O  U  R  B  A  S  E".
'''

import re
def space_jam(s):
    letters = list(s)
    x = ''
    for l in letters:
        if re.match('\s', l):
            pass
        else:
            x += l.upper() + '  '
    return x.strip()

space_jam("freeCodeCamp")