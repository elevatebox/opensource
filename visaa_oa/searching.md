# Linear Search vs Binary Search

## Linear Search

Linear search is a simple algorithm for finding an element in a list. It works by checking each element in the list one by one until the target element is found.

**Example:**

```python
t = int(input())
for _ in range(t):
    n, x = map(int, input().split())
    arr = list(map(int, input().split()))
    
    found = False
    for i in range(n):
        if arr[i] == x:
            print(i)
            found = True
            break
    if not found:
        print(-1)
```

The time complexity of linear search is O(n), as in the worst case, you may need to check all n elements in the list.

## Binary Search

Binary search is a more efficient algorithm for finding an element in a **sorted** list. It works by repeatedly dividing the search interval in half.

**Example:**

```python
t = int(input())
for _ in range(t):
    n, x = map(int, input().split())
    arr = list(map(int, input().split()))
    
    left, right = 0, n-1
    found = False
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == x:
            print(mid)
            found = True
            break
        elif arr[mid] < x:
            left = mid + 1
        else:
            right = mid - 1
    if not found:
        print(-1)
```

The time complexity of binary search is O(log n), as the search interval is halved with each step.

## Comparison

Let's consider a dictionary with 100,000 words, and we want to find a specific word.

**Linear Search:**
- Check page 1, page 2, ..., page 100,000
- Time complexity: O(100,000) = O(n)

**Binary Search:**
- Start with the middle page (50,000)
- If the word is in the left half, search the left half (0-49,999)
- If the word is in the right half, search the right half (50,000-99,999)
- Repeat the process, halving the search interval each time
- Number of steps: around 17 (log2 100,000 ≈ 17)
- Time complexity: O(log n)

As the size of the list grows, the advantage of binary search becomes more significant. For a list of 1 million elements, linear search would take up to 1 million steps, while binary search would only require around 20 steps.

The downside of binary search is that the list must be sorted beforehand, which has a time complexity of O(n log n). However, once the list is sorted, binary search can be used efficiently.

In summary, binary search is the preferred method for finding elements in sorted lists, as it has a much better time complexity of O(log n) compared to the O(n) of linear search. But it requires the additional step of sorting the list first.


# Searching in a Dictionary: Linear Search vs Binary Search

Imagine you have a physical dictionary with 100,000 pages, and you need to find a specific word. Let's compare the two search methods:

## Linear Search

1. Start at the first page (page 1).
2. Flip through the pages one by one, checking each word until you find the target word.
3. If the word is not found, you'll need to check all 100,000 pages.
4. Time complexity: O(n), where n is the number of pages (100,000 in this case).

This is like searching for a word in the dictionary by starting at the beginning and checking each page in order.

## Binary Search

1. Open the dictionary to the middle page (page 50,000).
2. Check if the target word is on this page.
   - If the target word is on this page, you've found it.
   - If the target word is earlier in the dictionary, the word you're looking for is in the first half (pages 1-49,999).
   - If the target word is later in the dictionary, the word you're looking for is in the second half (pages 50,001-100,000).
3. Discard the half of the dictionary where the word cannot be, and repeat the process on the remaining half.
4. Repeat this process, halving the search area each time, until you find the word or the search area is empty.
5. Time complexity: O(log n), where n is the number of pages (100,000 in this case).

This is a much more efficient approach, as you only need to check around 17 pages (log2 100,000 ≈ 17) to find the word, compared to potentially checking all 100,000 pages with linear search.

The key difference is that binary search works because the dictionary is sorted alphabetically. This allows you to quickly narrow down the search area by checking the middle and discarding half of the remaining pages each time.

In summary, for a 100,000-page dictionary:
- Linear search: Up to 100,000 steps
- Binary search: Around 17 steps

Binary search is the preferred method for finding words in a sorted dictionary, as it has a much better time complexity of O(log n) compared to the O(n) of linear search.



### When performing binary search on a sorted list:

1. Start by checking the middle element.
2. If the target value is less than the middle element, you know the target must be in the left half of the list.
   - This allows you to eliminate the right half of the list from further consideration.
3. If the target value is greater than the middle element, you know the target must be in the right half of the list. 
   - This allows you to eliminate the left half of the list from further consideration.
4. Repeat this process, halving the search space with each comparison, until you either find the target or the search space becomes empty.

For example, let's say we have a sorted list of 100,000 elements and we're searching for the value 75,000:

1. Check the middle element at index 50,000.
2. Since 75,000 is greater than the middle value, we know the target must be in the right half of the list.
3. We can now discard the left half of the list (elements 0 to 49,999) and focus our search on the right half (elements 50,000 to 99,999).
4. The new middle element is now at index 75,000.
5. Since 75,000 matches the target, we've found the element we were looking for.

By consistently eliminating half the search space, binary search is able to locate the target element in around log₂(n) steps, where n is the size of the list. This is a significant improvement over the linear search approach, which would require checking each of the 100,000 elements one by one.

The key advantage of binary search is that it can quickly narrow down the search area by making use of the sorted order of the list. This allows it to outperform linear search, especially as the list size grows larger.


#### With code binary search step-by-step with the code you provided:

```python
t = int(input())
for _ in range(0,t):
    n,x = map(int,input().split())
    arr = list(map(int,input().split()))
    arr.sort()

    l = 0 
    r = len(arr)-1

    while l<=r:
        mid = (l+r)//2
        if arr[mid]==x:
            print(mid)
            break
        
        elif arr[mid]<x: # right half
            l = mid+1
        
        else : # left half
            r = mid-1
        
    if(l>r):
        print("-1")
```

1. We start by initializing two pointers, `l` (left) and `r` (right), to represent the search range. Initially, `l` is set to 0 and `r` is set to the last index of the array (`len(arr)-1`).

2. We then enter a `while` loop that continues as long as `l` is less than or equal to `r`. This means we keep searching as long as the search range has not become empty.

3. Inside the loop, we calculate the middle index `mid` as `(l + r) // 2`.

4. We then check if the element at the middle index `arr[mid]` is equal to the target `x`:
   - If they are equal, we have found the target element, so we print the index `mid` and break out of the loop.

5. If `arr[mid]` is less than the target `x`, we know the target must be in the right half of the current search range. So, we update the left pointer `l` to `mid + 1` to search the right half.

6. If `arr[mid]` is greater than the target `x`, we know the target must be in the left half of the current search range. So, we update the right pointer `r` to `mid - 1` to search the left half.

7. We repeat steps 3-6 until either the target is found (step 4) or the search range becomes empty (i.e., `l` becomes greater than `r`).

8. If the loop completes without finding the target, we print `-1` to indicate the target was not found in the array.

The key point is that in each iteration, we are able to eliminate half of the search range by comparing the middle element to the target. This allows us to quickly narrow down the search area, leading to the O(log n) time complexity of binary search.
