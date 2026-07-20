########################################## 11 AUGUST 2025 ###############################################################
'''
Vowel Balance
Given a string, determine whether the number of vowels in the first half of the string is equal to the number of vowels 
in the second half.

The string can contain any characters.
The letters a, e, i, o, and u, in either uppercase or lowercase, are considered vowels.
If there's an odd number of characters in the string, ignore the center character.
Tests:

1. is_balanced("racecar") should return True.
2. is_balanced("Lorem Ipsum") should return True.
3. is_balanced("Kitty Ipsum") should return False.
4. is_balanced("string") should return False.
5. is_balanced(" ") should return True.
6. is_balanced("abcdefghijklmnopqrstuvwxyz") should return False.
7. is_balanced("123A#b!E&*456-o.U") should return True.
'''

def is_balanced(s):
  x = len(s)
  midpoint = round(x/2)
  left = s[:-midpoint]
  right = s[midpoint:]
  print(left, '  ', right)
  left_count = 0
  for char in left.lower():
    print(char)
    if char == 'a' or char == 'e' or char == 'i' or char == 'o' or char == 'u':
        left_count += 1
  right_count = 0
  for char in right.lower():
    if char == 'a' or char == 'e' or char == 'i' or char == 'o' or char == 'u':
      right_count += 1
      print(right_count)
  if left_count == right_count:
    return True
  else:
      return False
    
print(is_balanced('racecar'))
print(is_balanced('Lorem Ipsum'))
print(is_balanced('Kitty Ipsum'))
print(is_balanced('string'))
print(is_balanced(' '))
print(is_balanced('abcdefghijklmnopqrstuvwxyz'))
print(is_balanced('123A#b!E&8456-0.U'))