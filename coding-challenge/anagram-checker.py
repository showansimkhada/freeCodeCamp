################################## 16 August 2025 #####################################
'''
Anagram Checker
Given two strings, determine if they are anagrams of each other (contain the same characters in any order).

Ignore casing and white space.
Tests:

Passed: 1. are_anagrams("listen", "silent") should return true.
Passed: 2. are_anagrams("School master", "The classroom") should return true.
Passed: 3. are_anagrams("A gentleman", "Elegant man") should return true.
Passed: 4. are_anagrams("Hello", "World") should return false.
Passed: 5. are_anagrams("apple", "banana") should return false.
Passed: 6. are_anagrams("cat", "dog") should return false.
'''

def are_anagrams(str1, str2):
    valid = False
    for char1 in list(str1):
        if (char1 == ' '):
            pass
        if char1.lower() in list(str2.lower()):
            valid = True
        else:
            return False
    return valid

print(are_anagrams("listen", "silent"))
print(are_anagrams("School master", "The classroom"))
print(are_anagrams("A gentleman", "Elegant man"))
print(are_anagrams("Hello", "World"))
print(are_anagrams("apple", "banana"))
print(are_anagrams("cat", "dog"))