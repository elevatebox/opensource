# Array Problems Guide - Easy and Medium Difficulty

## Easy Problems

### 1. Find Maximum Element in Array

#### a) Iterative Approach
```python
def find_max_iterative(arr):
    if not arr: return None
    max_elem = arr[0]
    for num in arr:
        max_elem = max(max_elem, num)
    return max_elem
```
- TC: O(n) - single pass through array
- SC: O(1) - constant extra space

#### b) Recursive Approach
```python
def find_max_recursive(arr, n):
    if n == 1: return arr[0]
    return max(arr[n-1], find_max_recursive(arr, n-1))
```
- TC: O(n) - processes each element once
- SC: O(n) - recursion stack depth

### 2. Check if Array is Sorted

#### a) Iterative Approach
```python
def is_sorted_iterative(arr):
    for i in range(len(arr)-1):
        if arr[i] > arr[i+1]:
            return False
    return True
```
- TC: O(n) - single pass
- SC: O(1) - constant space

#### b) Recursive Approach
```python
def is_sorted_recursive(arr, n):
    if n <= 1: return True
    return arr[n-1] >= arr[n-2] and is_sorted_recursive(arr, n-1)
```
- TC: O(n) - checks each element once
- SC: O(n) - recursion stack

### 3. Reverse Array

#### a) Two-pointer Approach
```python
def reverse_iterative(arr):
    left, right = 0, len(arr)-1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr
```
- TC: O(n) - processes half the array
- SC: O(1) - in-place swaps

#### b) Recursive Approach
```python
def reverse_recursive(arr, start, end):
    if start >= end: return
    arr[start], arr[end] = arr[end], arr[start]
    reverse_recursive(arr, start+1, end-1)
```
- TC: O(n) - processes half the array
- SC: O(n) - recursion stack

## Medium Problems

### 4. Two Sum

#### a) Brute Force
```python
def two_sum_brute(arr, target):
    n = len(arr)
    for i in range(n):
        for j in range(i+1, n):
            if arr[i] + arr[j] == target:
                return [i, j]
    return []
```
- TC: O(n²) - nested loops
- SC: O(1) - constant space

#### b) Hash Map Approach
```python
def two_sum_hash(arr, target):
    seen = {}
    for i, num in enumerate(arr):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
```
- TC: O(n) - single pass
- SC: O(n) - hash map storage

#### c) Two-pointer (Sorted Array)
```python
def two_sum_sorted(arr, target):
    left, right = 0, len(arr)-1
    while left < right:
        curr_sum = arr[left] + arr[right]
        if curr_sum == target:
            return [left, right]
        elif curr_sum < target:
            left += 1
        else:
            right -= 1
    return []
```
- TC: O(n) - single pass
- SC: O(1) - constant space

### 5. Majority Element

#### a) Boyer-Moore Voting
```python
def majority_element(arr):
    candidate = None
    count = 0
    
    for num in arr:
        if count == 0:
            candidate = num
        count += (1 if num == candidate else -1)
    
    # Verify majority
    count = sum(1 for num in arr if num == candidate)
    return candidate if count > len(arr)//2 else None
```
- TC: O(n) - two passes
- SC: O(1) - constant space

### 6. Maximum Subarray Sum

#### a) Kadane's Algorithm
```python
def max_subarray_sum(arr):
    max_sum = curr_sum = arr[0]
    
    for num in arr[1:]:
        curr_sum = max(num, curr_sum + num)
        max_sum = max(max_sum, curr_sum)
    
    return max_sum
```
- TC: O(n) - single pass
- SC: O(1) - constant space

### 7. Second Largest Element

```python
def find_second_largest(arr):
    if len(arr) < 2:
        return None
    
    first = second = float('-inf')
    for num in arr:
        if num > first:
            second = first
            first = num
        elif num > second and num != first:
            second = num
            
    return second if second != float('-inf') else None
```
- TC: O(n) - single pass
- SC: O(1) - constant space

### 8. Find Duplicates

```python
def find_duplicates(arr):
    result = []
    for num in arr:
        idx = abs(num) - 1
        if arr[idx] > 0:
            arr[idx] = -arr[idx]
        else:
            result.append(abs(num))
    return result
```
- TC: O(n) - single pass
- SC: O(1) - modifies input array

### 9. Rotate Array

```python
def rotate_array(arr, k):
    n = len(arr)
    k = k % n
    
    def reverse(start, end):
        while start < end:
            arr[start], arr[end] = arr[end], arr[start]
            start += 1
            end -= 1
    
    reverse(0, n-1)
    reverse(0, k-1)
    reverse(k, n-1)
```
- TC: O(n) - three reversals
- SC: O(1) - in-place rotation

### 10. Smallest Missing Positive

```python
def find_smallest_missing(arr):
    n = len(arr)
    
    # Mark numbers <= 0 or > n as n+1
    for i in range(n):
        if arr[i] <= 0 or arr[i] > n:
            arr[i] = n + 1
    
    # Mark presence by making numbers negative
    for i in range(n):
        num = abs(arr[i])
        if num <= n:
            arr[num-1] = -abs(arr[num-1])
    
    # Find first positive number
    for i in range(n):
        if arr[i] > 0:
            return i + 1
            
    return n + 1
```
- TC: O(n) - three passes
- SC: O(1) - modifies input array

### 11. Dutch National Flag

```python
def sort_colors(arr):
    low = mid = 0
    high = len(arr) - 1
    
    while mid <= high:
        if arr[mid] == 0:
            arr[low], arr[mid] = arr[mid], arr[low]
            low += 1
            mid += 1
        elif arr[mid] == 1:
            mid += 1
        else:
            arr[mid], arr[high] = arr[high], arr[mid]
            high -= 1
```
- TC: O(n) - single pass
- SC: O(1) - in-place sorting

### 12. Longest Zero Sum Subarray

```python
def longest_zero_sum_subarray(arr):
    prefix_sum = 0
    max_len = 0
    sum_index = {0: -1}  # Initialize with 0 sum at index -1
    
    for i, num in enumerate(arr):
        prefix_sum += num
        
        if prefix_sum in sum_index:
            max_len = max(max_len, i - sum_index[prefix_sum])
        else:
            sum_index[prefix_sum] = i
            
    return max_len
```
- TC: O(n) - single pass
- SC: O(n) - hash map storage