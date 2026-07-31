################################## 17 August 2025 #####################################
'''
Targeted Sum
Given an array of numbers and an integer target, find two unique numbers in the array that add up to the target value. 
Return an array with the indices of those two numbers, or "Target not found" if no two numbers sum up to the target.

The returned array should have the indices in ascending order.
Tests:

Passed: 1. find_target([2, 7, 11, 15], 9) should return [0, 1].
Passed: 2. find_target([3, 2, 4, 5], 6) should return [1, 2].
Passed: 3. find_target([1, 3, 5, 6, 7, 8], 15) should return [4, 5].
Passed: 4. find_target([1, 3, 5, 7], 14) should return 'Target not found'.
'''

def find_target(arr, target):
    result = []
    for num in arr:
        find = target - num
        index1 = arr.index(num)
        try:
            index2 = arr.index(find)
        except ValueError:
            continue
        if index1 != index2 or num != find:
            result.append(index1)
            result.append(index2)
            break  
    if result:
        return sorted(result)
    else:
        return 'Target not found'

    

print(find_target([7, 11, 15, -2], 9))
print(find_target([3, 2, 4, 5], 6))
print(find_target([1, 3, 5, 6, 7, 8], 15))
print(find_target([1, 3, 3, 5, 7], 14))