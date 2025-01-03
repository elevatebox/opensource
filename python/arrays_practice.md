# Algorithm Practice Problems

## Array Operations

### 1. Circular Array Rotation
Problem: Given an array of n integers and a rotation distance k, rotate array right by k steps.
```python
def rotate_circular(arr, k):
    n = len(arr)
    k = k % n  # Normalize k
    # [1,2,3,4,5], k=2 -> [4,5,1,2,3]
    def reverse(start, end):
        while start < end:
            arr[start], arr[end] = arr[end], arr[start]
            start += 1
            end -= 1
    
    reverse(0, n-1)    # Reverse entire array
    reverse(0, k-1)    # Reverse first k elements
    reverse(k, n-1)    # Reverse remaining elements
```
TC: O(n), SC: O(1)

### 2. Sliding Window Maximum
Problem: Find maximum element in each sliding window of size k.
```python
from collections import deque

def max_sliding_window(arr, k):
    result = []
    q = deque()  # Store indices
    
    for i in range(len(arr)):
        # Remove elements outside current window
        while q and q[0] < i - k + 1:
            q.popleft()
            
        # Remove smaller elements
        while q and arr[q[-1]] < arr[i]:
            q.pop()
            
        q.append(i)
        
        # Add to result if window is complete
        if i >= k - 1:
            result.append(arr[q[0]])
            
    return result
```
TC: O(n), SC: O(k)

## String Manipulation

### 3. First Non-Repeating Character
Problem: Find first non-repeating character in string.
```python
def first_unique(s):
    char_count = {}
    
    # Count frequencies
    for char in s:
        char_count[char] = char_count.get(char, 0) + 1
    
    # Find first unique
    for i, char in enumerate(s):
        if char_count[char] == 1:
            return i
    return -1
```
TC: O(n), SC: O(1) - limited character set

### 4. String Compression
Problem: Compress string by counting repeated characters.
```python
def compress(s):
    if not s: return ""
    
    result = []
    count = 1
    current = s[0]
    
    for i in range(1, len(s)):
        if s[i] == current:
            count += 1
        else:
            result.append(current + str(count))
            current = s[i]
            count = 1
            
    result.append(current + str(count))
    compressed = ''.join(result)
    return compressed if len(compressed) < len(s) else s
```
TC: O(n), SC: O(n)

## Matrix Operations

### 5. Spiral Matrix Traversal
Problem: Print matrix elements in spiral order.
```python
def spiral_order(matrix):
    if not matrix: return []
    
    result = []
    top = left = 0
    bottom = len(matrix) - 1
    right = len(matrix[0]) - 1
    
    while top <= bottom and left <= right:
        # Top row
        for j in range(left, right + 1):
            result.append(matrix[top][j])
        top += 1
        
        # Right column
        for i in range(top, bottom + 1):
            result.append(matrix[i][right])
        right -= 1
        
        if top <= bottom:
            # Bottom row
            for j in range(right, left - 1, -1):
                result.append(matrix[bottom][j])
            bottom -= 1
        
        if left <= right:
            # Left column
            for i in range(bottom, top - 1, -1):
                result.append(matrix[i][left])
            left += 1
            
    return result
```
TC: O(m*n), SC: O(1)

## Advanced Problems

### 6. Maximum Product Subarray
Problem: Find contiguous subarray with largest product.
```python
def max_product_subarray(nums):
    max_so_far = min_so_far = result = nums[0]
    
    for i in range(1, len(nums)):
        temp = max(nums[i], max_so_far * nums[i], min_so_far * nums[i])
        min_so_far = min(nums[i], max_so_far * nums[i], min_so_far * nums[i])
        max_so_far = temp
        result = max(result, max_so_far)
        
    return result
```
TC: O(n), SC: O(1)

### 7. Next Permutation
Problem: Find next lexicographically greater permutation.
```python
def next_permutation(nums):
    # Find first decreasing element
    i = len(nums) - 2
    while i >= 0 and nums[i] >= nums[i + 1]:
        i -= 1
        
    if i >= 0:
        # Find successor to nums[i]
        j = len(nums) - 1
        while j >= 0 and nums[j] <= nums[i]:
            j -= 1
        nums[i], nums[j] = nums[j], nums[i]
    
    # Reverse suffix
    left = i + 1
    right = len(nums) - 1
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1
```
TC: O(n), SC: O(1)

## Practice Problems for Students

1. Find Equilibrium Index
   - Index where sum of elements on left equals sum on right
   - TC: O(n), SC: O(1)

2. Leaders in Array
   - Element is leader if greater than all elements to its right
   - TC: O(n), SC: O(1)

3. Merge Overlapping Intervals
   - Given intervals, merge overlapping ones
   - TC: O(n log n), SC: O(n)

4. Trapping Rain Water
   - Calculate water trapped between buildings
   - TC: O(n), SC: O(1)

5. Stock Buy Sell Multiple Times
   - Find maximum profit with multiple transactions
   - TC: O(n), SC: O(1)

6. Matrix Rotation
   - Rotate matrix 90 degrees clockwise
   - TC: O(n²), SC: O(1)

7. Search in Sorted Rotated Array
   - Find element in rotated sorted array
   - TC: O(log n), SC: O(1)

8. Longest Palindromic Substring
   - Find longest palindrome in string
   - TC: O(n²), SC: O(1)

9. Minimum Window Substring
   - Smallest window containing all characters of pattern
   - TC: O(n), SC: O(k)

10. Longest Consecutive Sequence
    - Find length of longest consecutive elements sequence
    - TC: O(n), SC: O(n)

For each problem, students should:
1. Understand problem requirements
2. Identify edge cases
3. Design solution approach
4. Write and optimize code
5. Analyze time and space complexity
6. Test with various inputs

Example Test Cases Format:
```python
def test_problem():
    assert function([1,2,3]) == expected_output
    assert function([]) == expected_output  # Empty
    assert function([1]) == expected_output # Single
    assert function([1,1,1]) == expected_output # Duplicates
```

Common Time Complexity Patterns:
- Linear search: O(n)
- Binary search: O(log n)
- Sorting: O(n log n)
- Matrix/Grid: O(m*n)
- Recursive: O(2ⁿ) or O(n!)

Space Complexity Tips:
1. In-place modifications
2. Two-pointer technique
3. Sliding window
4. Stack/Queue usage
5. Hash table trade-offs