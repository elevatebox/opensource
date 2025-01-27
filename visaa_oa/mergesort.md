# Merge Sort Algorithm Explanation
[Reference Video Tutorial](https://www.youtube.com/watch?v=jlHkDBEumP0)

## Overview
Merge Sort is a divide-and-conquer algorithm that recursively splits an array into two halves, sorts them, and then merges them back together in sorted order.

## Implementation in Both Languages

### Python Implementation
```python
def merge_sort(arr):
    if len(arr) < 2:
        return arr
    
    # Finding the middle point
    mid = len(arr) // 2
    
    # Dividing array into two halves
    left = arr[:mid]
    right = arr[mid:]
    
    # Recursive calls to sort both halves
    merge_sort(left)
    merge_sort(right)
    
    # Merge the sorted halves
    merge(arr, left, right)
    
def merge(arr, left, right):
    i = j = k = 0
    
    # Compare and merge elements
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            arr[k] = left[i]
            i += 1
        else:
            arr[k] = right[j]
            j += 1
        k += 1
    
    # Handle remaining elements in left array
    while i < len(left):
        arr[k] = left[i]
        i += 1
        k += 1
    
    # Handle remaining elements in right array
    while j < len(right):
        arr[k] = right[j]
        j += 1
        k += 1

# Example usage
if __name__ == "__main__":
    arr = [38, 27, 43, 3, 9, 82, 10]
    print(f"Original array: {arr}")
    merge_sort(arr)
    print(f"Sorted array: {arr}")
```

### Java Implementation
```java
public class MergeSort {
    public static void mergeSort(int[] arr) {
        if (arr.length < 2) {
            return;
        }
        
        int mid = arr.length / 2;
        int[] left = new int[mid];
        int[] right = new int[arr.length - mid];
        
        // Populate left array
        for (int i = 0; i < mid; i++) {
            left[i] = arr[i];
        }
        
        // Populate right array
        for (int i = mid; i < arr.length; i++) {
            right[i - mid] = arr[i];
        }
        
        mergeSort(left);
        mergeSort(right);
        merge(arr, left, right);
    }
    
    private static void merge(int[] arr, int[] left, int[] right) {
        int i = 0, j = 0, k = 0;
        
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                arr[k++] = left[i++];
            } else {
                arr[k++] = right[j++];
            }
        }
        
        while (i < left.length) {
            arr[k++] = left[i++];
        }
        
        while (j < right.length) {
            arr[k++] = right[j++];
        }
    }
}
```

## Detailed Explanation of the Merge Function

### Step 1: Function Parameters
```java
merge(int[] arr, int[] left, int[] right)
```
- `arr`: The original array being sorted
- `left`: Left subarray
- `right`: Right subarray

### Step 2: Initialize Pointers
```java
int i = 0;  // pointer for left array
int j = 0;  // pointer for right array
int k = 0;  // pointer for main array
```

### Step 3: Main Merging Process
```java
while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
        arr[k++] = left[i++];
    } else {
        arr[k++] = right[j++];
    }
}
```
#### Visualization of Merge Process:
```
Left array:  [27, 38]
Right array: [3, 43]

Step 1: Compare 27 and 3
        3 is smaller → arr[0] = 3
        [3, _, _, _]

Step 2: Compare 27 and 43
        27 is smaller → arr[1] = 27
        [3, 27, _, _]

And so on...
```

### Step 4: Handle Remaining Elements
```java
// Copy remaining elements of left array
while (i < left.length) {
    arr[k++] = left[i++];
}

// Copy remaining elements of right array
while (j < right.length) {
    arr[k++] = right[j++];
}
```

## Time and Space Complexity
- Time Complexity: O(n log n)
  - Dividing: O(log n) levels
  - Merging: O(n) at each level
- Space Complexity: O(n)
  - Additional space needed for temporary arrays

## Common Use Cases
1. Sorting large datasets
2. External sorting
3. Custom object sorting
4. Stable sorting requirement

## Advantages
1. Stable sorting algorithm
2. Guaranteed O(n log n) time complexity
3. Works well with linked lists

## Disadvantages
1. Requires extra space O(n)
2. Not in-place sorting
3. Overkill for small arrays

