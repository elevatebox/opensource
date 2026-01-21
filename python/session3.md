# Understanding Time and Space Complexity

## Dictionary Search Example

### Linear Search (O(n))
Let's consider searching for "elevatebox" in a 100,000-page dictionary:

```python
def linear_search_dictionary(dictionary, word):
    for page in range(len(dictionary)):  # 100,000 iterations
        if dictionary[page] == word:
            return page
    return -1
```

* Worst case: Check all 100,000 pages
* Best case: Find on first page
* Average case: Check 50,000 pages

### Binary Search (O(log n))
Using the fact that dictionary is sorted:

```python
def binary_search_dictionary(dictionary, word):
    left, right = 0, len(dictionary) - 1  # 0 to 99,999
    
    steps = []  # Track page numbers checked
    while left <= right:
        mid = (left + right) // 2
        steps.append(mid)
        
        if dictionary[mid] == word:
            return mid, steps
        elif dictionary[mid] < word:
            left = mid + 1
        else:
            right = mid - 1
```

Steps to find "elevatebox":
1. Page 50,000
2. Page 25,000
3. Page 12,500
4. Page 6,250
5. Page 3,125
...and so on

Total steps ≈ log₂(100,000) ≈ 17 steps

## Space Complexity Analysis

### What Takes Space?
1. Input Space: Original data structure size
2. Auxiliary Space: Extra space used by algorithm
3. Total Space = Input Space + Auxiliary Space

### Examples:

1. Constant Space O(1):
```python
def find_max(arr):
    max_val = arr[0]
    for num in arr:  # Only one variable regardless of input size
        max_val = max(max_val, num)
    return max_val
```

2. Linear Space O(n):
```python
def create_copy(arr):
    new_arr = []  # Space grows linearly with input
    for num in arr:
        new_arr.append(num)
    return new_arr
```

3. Logarithmic Space O(log n):
```python
def binary_search(arr, target):
    # Recursive version uses stack space
    def recursive_search(left, right):
        if left > right:
            return -1
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            return recursive_search(mid + 1, right)
        else:
            return recursive_search(left, mid - 1)
    
    return recursive_search(0, len(arr) - 1)
```

## Finding Duplicates: Three Approaches

### 1. Brute Force (O(n²) time, O(1) space)
```python
def find_duplicates_brute(arr):
    duplicates = []
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] == arr[j] and arr[i] not in duplicates:
                duplicates.append(arr[i])
    return duplicates
```

### 2. Sorting Approach (O(n log n) time, O(1) space)
```python
def find_duplicates_sorting(arr):
    arr.sort()  # O(n log n)
    duplicates = []
    for i in range(1, len(arr)):  # O(n)
        if arr[i] == arr[i-1] and arr[i] not in duplicates:
            duplicates.append(arr[i])
    return duplicates
```

### 3. Hash Set Approach (O(n) time, O(n) space)
```python
def find_duplicates_hash(arr):
    seen = set()
    duplicates = []
    for num in arr:
        if num in seen:
            duplicates.append(num)
        else:
            seen.add(num)
    return duplicates
```

## Common Time Complexity Scenarios

1. Simple loop: O(n)
```python
for i in range(n): # O(n)
    print(i)
```

2. Nested loops: O(n²)
```python
for i in range(n):    # O(n)
    for j in range(n): # O(n)
        print(i, j)    # Total: O(n²)
```

3. Logarithmic complexity: O(log n)
```python
n = 1000
while n > 1:  # Each iteration divides n by 2
    n = n // 2
```

4. Linear logarithmic: O(n log n)
```python
for i in range(n):           # O(n)
    temp = n
    while temp > 1:          # O(log n)
        temp = temp // 2
        # Total: O(n log n)
```

## Space Complexity Best Practices

1. In-place modifications when possible
2. Clear unnecessary variables
3. Use generators for large sequences
4. Consider trade-offs between time and space
5. Use appropriate data structures

```python
# Bad space usage
def square_all_bad(arr):
    return [num * num for num in arr]  # Creates new array

# Good space usage
def square_all_good(arr):
    for i in range(len(arr)):
        arr[i] = arr[i] * arr[i]  # Modifies in place
    return arr
```