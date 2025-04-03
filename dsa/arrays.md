# Arrays in Data Structures and Algorithms (DSA)

Arrays are fundamental data structures that store a collection of elements of the same data type in contiguous memory locations. Here's a breakdown of key concepts:   

## Key Characteristics:

Contiguous Memory: Elements are stored in adjacent memory locations, allowing for efficient access.
Fixed Size (in some languages): In languages like C/C++, the size of an array is typically fixed at compile time. In dynamic arrays (like Python lists or Java ArrayLists), the size can grow or shrink.
Zero-Based Indexing: Elements are accessed using indices starting from 0.
Random Access: Accessing any element by its index takes constant time, O(1).

## Basic Operations:
Traversal: Visiting each element of the array.
Insertion: Adding an element to the array (can be at the beginning, end, or middle).
Deletion: Removing an element from the array.
Searching: Finding a specific element in the array.
Sorting: Arranging elements in a specific order (e.g., ascending or descending).
Updating: Modifying the value of an element at a given index.

## Time Complexity:
Access: O(1)
Insertion (at the end): O(1) (for dynamic arrays, amortized O(1))
Insertion (at the beginning or middle): O(n)
Deletion (at the end): O(1)
Deletion (at the beginning or middle): O(n)
Search (unsorted array): O(n)
Search (sorted array): O(log n) (using binary search)
Sample Question: Two Sum

### Problem Statement:

Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.   

Example:

Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: nums[0] + nums[1] == 9, so we return [0, 1].
Solution (Python):   



def twoSum(nums, target):
    """
    Finds two numbers in an array that add up to a target.

    Args:
        nums: A list of integers.
        target: The target sum.

    Returns:
        A list of two indices.
    """
    num_map = {}  # Create a dictionary to store numbers and their indices

    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i

    return None  # Should not reach here, as there's always a solution

# Example Usage:
nums = [2, 7, 11, 15]
target = 9
result = twoSum(nums, target)
print(result)  # Output: [0, 1]
Explanation:

Hash Map (Dictionary): We use a dictionary num_map to store each number from the nums array as a key and its index as the value.
Iteration: We iterate through the nums array.
Complement: For each number num, we calculate its complement, which is the value needed to reach the target.
Check in Hash Map: We check if the complement exists as a key in the num_map.
If it exists, it means we have found the two numbers that add up to the target. We return the index of the complement (from the num_map) and the current index i.
Store in Hash Map: If the complement is not found, we store the current number num and its index i in the num_map.
Time and Space Complexity:

Time Complexity: O(n), where n is the length of the nums array. We iterate through the array once.
Space Complexity: O(n), in the worst case, we store all elements of the array in the hash map
