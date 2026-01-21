# Coding Interview Problems - Solutions

## 1. Two Sum
**Problem:** Given an array of integers nums and an integer target, return indices of the two numbers in nums that add up to target.

### Python Solution
```python
def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
```

### Java Solution
```java
public class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }
}
```

## 2. Best Time to Buy and Sell Stock
**Problem:** Given an array prices where prices[i] is the price of a given stock on the ith day, maximize profit by choosing a single day to buy and a different day in the future to sell.

### Python Solution
```python
def maxProfit(prices):
    if not prices:
        return 0
    
    min_price = float('inf')
    max_profit = 0
    
    for price in prices:
        min_price = min(min_price, price)
        current_profit = price - min_price
        max_profit = max(max_profit, current_profit)
    
    return max_profit
```

### Java Solution
```java
public class Solution {
    public int maxProfit(int[] prices) {
        if (prices == null || prices.length < 2) return 0;
        
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        
        for (int price : prices) {
            minPrice = Math.min(minPrice, price);
            maxProfit = Math.max(maxProfit, price - minPrice);
        }
        
        return maxProfit;
    }
}
```

## 3. Contains Duplicate
**Problem:** Given an integer array nums, return true if any value appears at least twice, and false if every element is distinct.

### Python Solution
```python
def containsDuplicate(nums):
    return len(nums) != len(set(nums))
```

### Java Solution
```java
public class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int num : nums) {
            if (!set.add(num)) {
                return true;
            }
        }
        return false;
    }
}
```

## 4. Product of Array Except Self
**Problem:** Given an integer array nums, return an array answer such that answer[i] is equal to the product of all elements of nums except nums[i].

### Python Solution
```python
def productExceptSelf(nums):
    n = len(nums)
    answer = [1] * n
    
    # Calculate lefts products
    left_product = 1
    for i in range(n):
        answer[i] = left_product
        left_product *= nums[i]
    
    # Calculate rights products
    right_product = 1
    for i in range(n-1, -1, -1):
        answer[i] *= right_product
        right_product *= nums[i]
        
    return answer
```

### Java Solution
```java
public class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] answer = new int[n];
        
        // Calculate lefts products
        answer[0] = 1;
        for (int i = 1; i < n; i++) {
            answer[i] = answer[i-1] * nums[i-1];
        }
        
        // Calculate rights products
        int rightProduct = 1;
        for (int i = n-1; i >= 0; i--) {
            answer[i] *= rightProduct;
            rightProduct *= nums[i];
        }
        
        return answer;
    }
}
```

## 5. Maximum Subarray
**Problem:** Given an integer array nums, find the contiguous subarray with the largest sum and return its sum.

### Python Solution
```python
def maxSubArray(nums):
    max_sum = current_sum = nums[0]
    
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    
    return max_sum
```

### Java Solution
```java
public class Solution {
    public int maxSubArray(int[] nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        
        return maxSum;
    }
}
```
## 6. Maximum Product Subarray
**Problem:** Given an integer array nums, find a contiguous non-empty subarray within the array that has the largest product, and return the product.

### Python Solution
```python
def maxProduct(nums):
    if not nums:
        return 0
    
    max_prod = min_prod = result = nums[0]
    
    for num in nums[1:]:
        temp = max(num, max_prod * num, min_prod * num)
        min_prod = min(num, max_prod * num, min_prod * num)
        max_prod = temp
        result = max(result, max_prod)
    
    return result
```

### Java Solution
```java
public class Solution {
    public int maxProduct(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int maxProduct = nums[0];
        int minProduct = nums[0];
        int result = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            int temp = maxProduct;
            maxProduct = Math.max(Math.max(nums[i], maxProduct * nums[i]), minProduct * nums[i]);
            minProduct = Math.min(Math.min(nums[i], temp * nums[i]), minProduct * nums[i]);
            result = Math.max(result, maxProduct);
        }
        
        return result;
    }
}
```

## 7. Find Minimum in Rotated Sorted Array
**Problem:** Given a sorted array that has been rotated between 1 and n times, find the minimum element.

### Python Solution
```python
def findMin(nums):
    left, right = 0, len(nums) - 1
    
    while left < right:
        mid = (left + right) // 2
        
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid
            
    return nums[left]
```

### Java Solution
```java
public class Solution {
    public int findMin(int[] nums) {
        int left = 0, right = nums.length - 1;
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        return nums[left];
    }
}
```

## 8. Search in Rotated Sorted Array
**Problem:** Given a rotated sorted array and a target value, return the index of the target if it exists, -1 otherwise.

### Python Solution
```python
def search(nums, target):
    if not nums:
        return -1
        
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if nums[mid] == target:
            return mid
            
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
                
    return -1
```

### Java Solution
```java
public class Solution {
    public int search(int[] nums, int target) {
        if (nums == null || nums.length == 0) return -1;
        
        int left = 0, right = nums.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] == target) {
                return mid;
            }
            
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        
        return -1;
    }
}
```

## 9. 3Sum
**Problem:** Given an array nums of n integers, find all unique triplets in the array which gives the sum of zero.

### Python Solution
```python
def threeSum(nums):
    nums.sort()
    result = []
    
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]:
            continue
            
        left, right = i + 1, len(nums) - 1
        
        while left < right:
            current_sum = nums[i] + nums[left] + nums[right]
            
            if current_sum == 0:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left+1]:
                    left += 1
                while left < right and nums[right] == nums[right-1]:
                    right -= 1
                left += 1
                right -= 1
            elif current_sum < 0:
                left += 1
            else:
                right -= 1
                
    return result
```

### Java Solution
```java
public class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> result = new ArrayList<>();
        
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i-1]) continue;
            
            int left = i + 1;
            int right = nums.length - 1;
            
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                
                if (sum == 0) {
                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    while (left < right && nums[left] == nums[left+1]) left++;
                    while (left < right && nums[right] == nums[right-1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        
        return result;
    }
}
```

## 10. Container With Most Water
**Problem:** Given n non-negative integers representing an array of heights, find the maximum amount of water a container can store.

### Python Solution
```python
def maxArea(height):
    max_area = 0
    left = 0
    right = len(height) - 1
    
    while left < right:
        width = right - left
        current_area = width * min(height[left], height[right])
        max_area = max(max_area, current_area)
        
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
            
    return max_area
```

### Java Solution
```java
public class Solution {
    public int maxArea(int[] height) {
        int maxArea = 0;
        int left = 0;
        int right = height.length - 1;
        
        while (left < right) {
            int width = right - left;
            maxArea = Math.max(maxArea, Math.min(height[left], height[right]) * width);
            
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        
        return maxArea;
    }
}
```
## 11. Sum of Two Integers (Without Using + or -)
**Problem:** Calculate the sum of two integers without using the + or - operators.

### Python Solution
```python
def getSum(a, b):
    mask = 0xffffffff
    while b != 0:
        carry = (a & b) << 1
        a = (a ^ b) & mask
        b = carry & mask
    return a if a <= 0x7fffffff else ~(a ^ mask)
```

### Java Solution
```java
public class Solution {
    public int getSum(int a, int b) {
        while (b != 0) {
            int carry = a & b;
            a = a ^ b;
            b = carry << 1;
        }
        return a;
    }
}
```

## 12. Number of 1 Bits
**Problem:** Write a function that takes an unsigned integer and returns the number of '1' bits it has.

### Python Solution
```python
def hammingWeight(n):
    count = 0
    while n:
        count += n & 1
        n >>= 1
    return count
```

### Java Solution
```java
public class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            count += n & 1;
            n >>>= 1;
        }
        return count;
    }
}
```

## 13. Counting Bits
**Problem:** Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.

### Python Solution
```python
def countBits(n):
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        dp[i] = dp[i >> 1] + (i & 1)
    return dp
```

### Java Solution
```java
public class Solution {
    public int[] countBits(int n) {
        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
}
```

## 14. Missing Number
**Problem:** Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.

### Python Solution
```python
def missingNumber(nums):
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum
```

### Java Solution
```java
public class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length;
        int expectedSum = n * (n + 1) / 2;
        int actualSum = 0;
        for (int num : nums) {
            actualSum += num;
        }
        return expectedSum - actualSum;
    }
}
```

## 15. Climbing Stairs
**Problem:** You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

### Python Solution
```python
def climbStairs(n):
    if n <= 2:
        return n
    
    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2
    
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]
```

### Java Solution
```java
public class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        
        int[] dp = new int[n + 1];
        dp[1] = 1;
        dp[2] = 2;
        
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i-1] + dp[i-2];
        }
        
        return dp[n];
    }
}
```

## 16. Coin Change
**Problem:** Given an array of coins and a total amount, return the fewest number of coins needed to make up that amount.

### Python Solution
```python
def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] = min(dp[x], dp[x - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1
```

### Java Solution
```java
public class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        
        for (int coin : coins) {
            for (int x = coin; x <= amount; x++) {
                dp[x] = Math.min(dp[x], dp[x - coin] + 1);
            }
        }
        
        return dp[amount] > amount ? -1 : dp[amount];
    }
}
```

## 17. Longest Increasing Subsequence
**Problem:** Given an integer array nums, return the length of the longest strictly increasing subsequence.

### Python Solution
```python
def lengthOfLIS(nums):
    if not nums:
        return 0
        
    dp = [1] * len(nums)
    
    for i in range(1, len(nums)):
        for j in range(i):
            if nums[i] > nums[j]:
                dp[i] = max(dp[i], dp[j] + 1)
    
    return max(dp)
```

### Java Solution
```java
public class Solution {
    public int lengthOfLIS(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int[] dp = new int[nums.length];
        Arrays.fill(dp, 1);
        int maxLen = 1;
        
        for (int i = 1; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            maxLen = Math.max(maxLen, dp[i]);
        }
        
        return maxLen;
    }
}
```

## 18. Longest Common Subsequence
**Problem:** Given two strings text1 and text2, return the length of their longest common subsequence.

### Python Solution
```python
def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]
```

### Java Solution
```java
public class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i-1) == text2.charAt(j-1)) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        
        return dp[m][n];
    }
}
```

## 19. Word Break
**Problem:** Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

### Python Solution
```python
def wordBreak(s, wordDict):
    dp = [False] * (len(s) + 1)
    dp[0] = True
    
    for i in range(1, len(s) + 1):
        for word in wordDict:
            if len(word) <= i and dp[i - len(word)]:
                if s[i - len(word):i] == word:
                    dp[i] = True
                    break
    
    return dp[len(s)]
```

### Java Solution
```java
public class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> dictionary = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        
        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && dictionary.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        
        return dp[s.length()];
    }
}
```

## 20. Combination Sum
**Problem:** Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target.

### Python Solution
```python
def combinationSum(candidates, target):
    def backtrack(remain, combo, start):
        if remain == 0:
            result.append(list(combo))
            return
        
        for i in range(start, len(candidates)):
            if candidates[i] > remain:
                continue
            combo.append(candidates[i])
            backtrack(remain - candidates[i], combo, i)
            combo.pop()
    
    result = []
    candidates.sort()
    backtrack(target, [], 0)
    return result
```

### Java Solution
```java
public class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(candidates);
        backtrack(result, new ArrayList<>(), candidates, target, 0);
        return result;
    }
    
    private void backtrack(List<List<Integer>> result, List<Integer> temp, 
                          int[] candidates, int remain, int start) {
        if (remain == 0) {
            result.add(new ArrayList<>(temp));
            return;
        }
        
        for (int i = start; i < candidates.length; i++) {
            if (candidates[i] > remain) break;
            temp.add(candidates[i]);
            backtrack(result, temp, candidates, remain - candidates[i], i);
            temp.remove(temp.size() - 1);
        }
    }
}
```
## 21. House Robber
**Problem:** Given an array of integers representing money in houses, determine maximum amount you can rob without robbing adjacent houses.

### Python Solution
```python
def rob(nums):
    if not nums:
        return 0
    if len(nums) <= 2:
        return max(nums)
    
    dp = [0] * len(nums)
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])
    
    for i in range(2, len(nums)):
        dp[i] = max(dp[i-1], dp[i-2] + nums[i])
    
    return dp[-1]
```

### Java Solution
```java
public class Solution {
    public int rob(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        if (nums.length <= 2) return nums.length == 1 ? nums[0] : Math.max(nums[0], nums[1]);
        
        int[] dp = new int[nums.length];
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);
        
        for (int i = 2; i < nums.length; i++) {
            dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i]);
        }
        
        return dp[nums.length - 1];
    }
}
```

## 22. House Robber II
**Problem:** Same as House Robber, but houses are arranged in a circle (first and last houses are adjacent).

### Python Solution
```python
def rob(nums):
    def simple_rob(nums):
        if not nums:
            return 0
        if len(nums) <= 2:
            return max(nums) if nums else 0
            
        dp = [0] * len(nums)
        dp[0] = nums[0]
        dp[1] = max(nums[0], nums[1])
        
        for i in range(2, len(nums)):
            dp[i] = max(dp[i-1], dp[i-2] + nums[i])
        
        return dp[-1]
    
    if len(nums) <= 3:
        return max(nums) if nums else 0
        
    return max(simple_rob(nums[1:]), simple_rob(nums[:-1]))
```

### Java Solution
```java
public class Solution {
    public int rob(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        if (nums.length <= 3) return nums.length == 1 ? nums[0] : Math.max(nums[0], nums[1]);
        
        return Math.max(
            robRange(nums, 0, nums.length - 2),
            robRange(nums, 1, nums.length - 1)
        );
    }
    
    private int robRange(int[] nums, int start, int end) {
        int prev2 = 0, prev1 = 0;
        for (int i = start; i <= end; i++) {
            int temp = prev1;
            prev1 = Math.max(prev1, prev2 + nums[i]);
            prev2 = temp;
        }
        return prev1;
    }
}
```

## 23. Decode Ways
**Problem:** Given a string containing digits, determine how many ways to decode it to letters (A-Z, where 1=A, 2=B, ..., 26=Z).

### Python Solution
```python
def numDecodings(s):
    if not s or s[0] == '0':
        return 0
        
    dp = [0] * (len(s) + 1)
    dp[0] = 1
    dp[1] = 1
    
    for i in range(2, len(s) + 1):
        # One digit
        if s[i-1] != '0':
            dp[i] += dp[i-1]
        # Two digits
        two_digit = int(s[i-2:i])
        if 10 <= two_digit <= 26:
            dp[i] += dp[i-2]
    
    return dp[-1]
```

### Java Solution
```java
public class Solution {
    public int numDecodings(String s) {
        if (s == null || s.length() == 0 || s.charAt(0) == '0') return 0;
        
        int[] dp = new int[s.length() + 1];
        dp[0] = 1;
        dp[1] = 1;
        
        for (int i = 2; i <= s.length(); i++) {
            // One digit
            if (s.charAt(i-1) != '0') {
                dp[i] += dp[i-1];
            }
            // Two digits
            int twoDigit = Integer.parseInt(s.substring(i-2, i));
            if (twoDigit >= 10 && twoDigit <= 26) {
                dp[i] += dp[i-2];
            }
        }
        
        return dp[s.length()];
    }
}
```

## 24. Unique Paths
**Problem:** Robot moving in a grid from top-left to bottom-right. How many unique paths are possible if it can only move right or down?

### Python Solution
```python
def uniquePaths(m, n):
    dp = [[1] * n for _ in range(m)]
    
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    
    return dp[m-1][n-1]
```

### Java Solution
```java
public class Solution {
    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];
        
        // Initialize first row and column
        for (int i = 0; i < m; i++) dp[i][0] = 1;
        for (int j = 0; j < n; j++) dp[0][j] = 1;
        
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = dp[i-1][j] + dp[i][j-1];
            }
        }
        
        return dp[m-1][n-1];
    }
}
```

## 25. Jump Game
**Problem:** Given an array where each element represents maximum jump length at that position, determine if you can reach the last index.

### Python Solution
```python
def canJump(nums):
    max_reach = 0
    
    for i in range(len(nums)):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + nums[i])
        if max_reach >= len(nums) - 1:
            return True
    
    return True
```

### Java Solution
```java
public class Solution {
    public boolean canJump(int[] nums) {
        int maxReach = 0;
        
        for (int i = 0; i <= maxReach && i < nums.length; i++) {
            maxReach = Math.max(maxReach, i + nums[i]);
            if (maxReach >= nums.length - 1) return true;
        }
        
        return false;
    }
}
```

## 26. Clone Graph
**Problem:** Given a reference of a node in a connected undirected graph, return a deep copy of the graph.

### Python Solution
```python
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def cloneGraph(node):
    if not node:
        return None
    
    visited = {}
    
    def dfs(node):
        if node in visited:
            return visited[node]
        
        copy = Node(node.val)
        visited[node] = copy
        
        for neighbor in node.neighbors:
            copy.neighbors.append(dfs(neighbor))
        
        return copy
    
    return dfs(node)
```

### Java Solution
```java
class Solution {
    private HashMap<Node, Node> visited = new HashMap<>();
    
    public Node cloneGraph(Node node) {
        if (node == null) return null;
        
        if (visited.containsKey(node)) {
            return visited.get(node);
        }
        
        Node cloneNode = new Node(node.val, new ArrayList<>());
        visited.put(node, cloneNode);
        
        for (Node neighbor : node.neighbors) {
            cloneNode.neighbors.add(cloneGraph(neighbor));
        }
        
        return cloneNode;
    }
}
```

## 27. Course Schedule
**Problem:** Given total number of courses and prerequisites, determine if it's possible to finish all courses.

### Python Solution
```python
def canFinish(numCourses, prerequisites):
    graph = [[] for _ in range(numCourses)]
    visited = [0] * numCourses
    
    # Build graph
    for x, y in prerequisites:
        graph[x].append(y)
    
    def hasCycle(course):
        if visited[course] == 1:
            return True
        if visited[course] == 2:
            return False
            
        visited[course] = 1
        for prereq in graph[course]:
            if hasCycle(prereq):
                return True
        visited[course] = 2
        return False
    
    for course in range(numCourses):
        if hasCycle(course):
            return False
    return True
```

### Java Solution
```java
public class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        ArrayList<Integer>[] graph = new ArrayList[numCourses];
        for (int i = 0; i < numCourses; i++) {
            graph[i] = new ArrayList<>();
        }
        
        // Build graph
        for (int[] edge : prerequisites) {
            graph[edge[0]].add(edge[1]);
        }
        
        int[] visited = new int[numCourses];
        
        for (int i = 0; i < numCourses; i++) {
            if (hasCycle(graph, visited, i)) {
                return false;
            }
        }
        return true;
    }
    
    private boolean hasCycle(ArrayList<Integer>[] graph, int[] visited, int course) {
        if (visited[course] == 1) return true;
        if (visited[course] == 2) return false;
        
        visited[course] = 1;
        for (int neighbor : graph[course]) {
            if (hasCycle(graph, visited, neighbor)) {
                return true;
            }
        }
        visited[course] = 2;
        return false;
    }
}
```

## 28. Number of Islands
**Problem:** Given a 2D grid of '1's (land) and '0's (water), count the number of islands.

### Python Solution
```python
def numIslands(grid):
    if not grid:
        return 0
        
    count = 0
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == '1':
                dfs(grid, i, j)
                count += 1
    return count

def dfs(grid, i, j):
    if i < 0 or j < 0 or i >= len(grid) or j >= len(grid[0]) or grid[i][j] != '1':
        return
    
    grid[i][j] = '#'  # mark as visited
    dfs(grid, i+1, j)
    dfs(grid, i-1, j)
    dfs(grid, i, j+1)
    dfs(grid, i, j-1)
```

### Java Solution
```java
public class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        
        int count = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == '1') {
                    dfs(grid, i, j);
                    count++;
                }
            }
        }
        return count;
    }
    
    private void dfs(char[][] grid, int i, int j) {
        if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] != '1')
            return;
            
        grid[i][j] = '#';  // mark as visited
        dfs(grid, i+1, j);
        dfs(grid, i-1, j);
        dfs(grid, i, j+1);
        dfs(grid, i, j-1);
    }
}
```

## 29. Longest Consecutive Sequence
**Problem:** Given an unsorted array of integers, find the length of the longest consecutive elements sequence.

### Python Solution
```python
def longestConsecutive(nums):
    if not nums:
        return 0
        
    num_set = set(nums)
    max_length = 0
    
    for num in num_set:
        if num - 1 not in num_set:
            current = num
            current_length = 1
            
            while current + 1 in num_set:
                current += 1
                current_length += 1
            
            max_length = max(max_length, current_length)
    
    return max_length
```

### Java Solution
```java
public class Solution {
    public int longestConsecutive(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        Set<Integer> set = new HashSet<>();
        for (int num : nums) set.add(num);
        
        int maxLength = 0;
        
        for (int num : set) {
            if (!set.contains(num - 1)) {
                int currentNum = num;
                int currentLength = 1;
                
                while (set.contains(currentNum + 1)) {
                    currentNum++;
                    currentLength++;
                }
                
                maxLength = Math.max(maxLength, currentLength);
            }
        }
        
        return maxLength;
    }
}
```

## 30. Insert Interval
**Problem:** Given a set of non-overlapping intervals and a new interval, insert the new interval and merge if necessary.

### Python Solution
```python
def insert(intervals, newInterval):
    result = []
    i = 0
    
    # Add intervals before newInterval
    while i < len(intervals) and intervals[i][1] < newInterval[0]:
        result.append(intervals[i])
        i += 1
    
    # Merge overlapping intervals
    while i < len(intervals) and intervals[i][0] <= newInterval[1]:
        newInterval[0] = min(newInterval[0], intervals[i][0])
        newInterval[1] = max(newInterval[1], intervals[i][1])
        i += 1
    result.append(newInterval)
    
    # Add remaining intervals
    while i < len(intervals):
        result.append(intervals[i])
        i += 1
    
    return result
```

### Java Solution
```java
public class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> result = new ArrayList<>();
        int i = 0;
        
        // Add intervals before newInterval
        while (i < intervals.length && intervals[i][1] < newInterval[0]) {
            result.add(intervals[i]);
            i++;
        }
        
        // Merge overlapping intervals
        while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.add(newInterval);
        
        // Add remaining intervals
        while (i < intervals.length) {
            result.add(intervals[i]);
            i++;
        }
        
        return result.toArray(new int[result.size()][]);
    }
}
```

## 31. Merge Intervals
**Problem:** Given an array of intervals, merge all overlapping intervals.

### Python Solution
```python
def merge(intervals):
    if not intervals:
        return []
        
    intervals.sort(key=lambda x: x[0])
    result = [intervals[0]]
    
    for i in range(1, len(intervals)):
        if intervals[i][0] <= result[-1][1]:
            result[-1][1] = max(result[-1][1], intervals[i][1])
        else:
            result.append(intervals[i])
    
    return result
```

### Java Solution
```java
public class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals == null || intervals.length <= 1) {
            return intervals;
        }
        
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> result = new ArrayList<>();
        result.add(intervals[0]);
        
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] <= result.get(result.size() - 1)[1]) {
                result.get(result.size() - 1)[1] = 
                    Math.max(result.get(result.size() - 1)[1], intervals[i][1]);
            } else {
                result.add(intervals[i]);
            }
        }
        
        return result.toArray(new int[result.size()][]);
    }
}
```

## 32. Non-overlapping Intervals
**Problem:** Given an array of intervals, find the minimum number of intervals to remove to make the rest non-overlapping.

### Python Solution
```python
def eraseOverlapIntervals(intervals):
    if not intervals:
        return 0
        
    intervals.sort(key=lambda x: x[1])
    non_overlap = 1
    end = intervals[0][1]
    
    for i in range(1, len(intervals)):
        if intervals[i][0] >= end:
            non_overlap += 1
            end = intervals[i][1]
    
    return len(intervals) - non_overlap
```

### Java Solution
```java
public class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        if (intervals == null || intervals.length == 0) return 0;
        
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
        int non_overlap = 1;
        int end = intervals[0][1];
        
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] >= end) {
                non_overlap++;
                end = intervals[i][1];
            }
        }
        
        return intervals.length - non_overlap;
    }
}
```

## 33. Reverse Linked List
**Problem:** Reverse a singly linked list.

### Python Solution
```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseList(head):
    prev = None
    curr = head
    
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    
    return prev
```

### Java Solution
```java
public class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        
        return prev;
    }
}
```

## 34. Detect Cycle in Linked List
**Problem:** Given a linked list, determine if it has a cycle in it.

### Python Solution
```python
def hasCycle(head):
    if not head or not head.next:
        return False
    
    slow = head
    fast = head.next
    
    while slow != fast:
        if not fast or not fast.next:
            return False
        slow = slow.next
        fast = fast.next.next
    
    return True
```

### Java Solution
```java
public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) {
            return false;
        }
        
        ListNode slow = head;
        ListNode fast = head.next;
        
        while (slow != fast) {
            if (fast == null || fast.next == null) {
                return false;
            }
            slow = slow.next;
            fast = fast.next.next;
        }
        
        return true;
    }
}
```

## 35. Merge Two Sorted Lists
**Problem:** Merge two sorted linked lists and return it as a new sorted list.

### Python Solution
```python
def mergeTwoLists(l1, l2):
    dummy = ListNode(0)
    current = dummy
    
    while l1 and l2:
        if l1.val <= l2.val:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next
    
    current.next = l1 if l1 else l2
    return dummy.next
```

### Java Solution
```java
public class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        
        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }
        
        current.next = l1 != null ? l1 : l2;
        return dummy.next;
    }
}
```

## 36. Merge K Sorted Lists
**Problem:** Merge k sorted linked lists and return it as one sorted list.

### Python Solution
```python
import heapq

def mergeKLists(lists):
    heap = []
    dummy = ListNode(0)
    current = dummy
    
    # Add first elements to heap
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst.val, i, lst))
    
    while heap:
        val, i, node = heapq.heappop(heap)
        current.next = node
        current = current.next
        
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    
    return dummy.next
```

### Java Solution
```java
public class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) return null;
        
        PriorityQueue<ListNode> queue = new PriorityQueue<>((a, b) -> a.val - b.val);
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        
        // Add first elements to queue
        for (ListNode list : lists) {
            if (list != null) {
                queue.offer(list);
            }
        }
        
        while (!queue.isEmpty()) {
            ListNode node = queue.poll();
            current.next = node;
            current = current.next;
            
            if (node.next != null) {
                queue.offer(node.next);
            }
        }
        
        return dummy.next;
    }
}
```

## 37. Remove Nth Node From End
**Problem:** Remove the nth node from the end of a linked list and return its head.

### Python Solution
```python
def removeNthFromEnd(head, n):
    dummy = ListNode(0)
    dummy.next = head
    first = dummy
    second = dummy
    
    # Advance first pointer by n+1 steps
    for i in range(n + 1):
        first = first.next
    
    # Move both pointers until first reaches the end
    while first:
        first = first.next
        second = second.next
    
    # Remove the nth node
    second.next = second.next.next
    return dummy.next
```

### Java Solution
```java
public class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode first = dummy;
        ListNode second = dummy;
        
        // Advance first pointer by n+1 steps
        for (int i = 0; i <= n; i++) {
            first = first.next;
        }
        
        // Move both pointers until first reaches the end
        while (first != null) {
            first = first.next;
            second = second.next;
        }
        
        // Remove the nth node
        second.next = second.next.next;
        return dummy.next;
    }
}
```

## 38. Reorder List
**Problem:** Given a singly linked list L: L0→L1→…→Ln-1→Ln, reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…

### Python Solution
```python
def reorderList(head):
    if not head or not head.next:
        return
    
    # Find the middle
    slow = fast = head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next
    
    # Reverse the second half
    prev = None
    curr = slow.next
    slow.next = None
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    
    # Merge two halves
    first = head
    second = prev
    while second:
        next_temp = first.next
        first.next = second
        first = next_temp
        
        next_temp = second.next
        second.next = first
        second = next_temp
```

### Java Solution
```java
public class Solution {
    public void reorderList(ListNode head) {
        if (head == null || head.next == null) return;
        
        // Find the middle
        ListNode slow = head, fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        // Reverse the second half
        ListNode prev = null, curr = slow.next;
        slow.next = null;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        
        // Merge two halves
        ListNode first = head, second = prev;
        while (second != null) {
            ListNode temp1 = first.next;
            ListNode temp2 = second.next;
            first.next = second;
            second.next = temp1;
            first = temp1;
            second = temp2;
        }
    }
}
```
## 39. Set Matrix Zeroes
**Problem:** Given an m x n matrix, if an element is 0, set its entire row and column to 0. Do it in-place.

### Python Solution
```python
def setZeroes(matrix):
    if not matrix:
        return
    
    m, n = len(matrix), len(matrix[0])
    first_row_has_zero = False
    first_col_has_zero = False
    
    # Check if first row has any zeros
    for j in range(n):
        if matrix[0][j] == 0:
            first_row_has_zero = True
            break
            
    # Check if first column has any zeros
    for i in range(m):
        if matrix[i][0] == 0:
            first_col_has_zero = True
            break
            
    # Use first row and column as markers
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0
                
    # Set zeros based on markers
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][0] == 0 or matrix[0][j] == 0:
                matrix[i][j] = 0
                
    # Set first row to zeros if needed
    if first_row_has_zero:
        for j in range(n):
            matrix[0][j] = 0
            
    # Set first column to zeros if needed
    if first_col_has_zero:
        for i in range(m):
            matrix[i][0] = 0
```

### Java Solution
```java
public class Solution {
    public void setZeroes(int[][] matrix) {
        if (matrix == null || matrix.length == 0) return;
        
        int m = matrix.length;
        int n = matrix[0].length;
        boolean firstRowHasZero = false;
        boolean firstColHasZero = false;
        
        // Check first row
        for (int j = 0; j < n; j++) {
            if (matrix[0][j] == 0) {
                firstRowHasZero = true;
                break;
            }
        }
        
        // Check first column
        for (int i = 0; i < m; i++) {
            if (matrix[i][0] == 0) {
                firstColHasZero = true;
                break;
            }
        }
        
        // Use first row and column as markers
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }
        
        // Set zeros based on markers
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }
        
        // Set first row
        if (firstRowHasZero) {
            for (int j = 0; j < n; j++) {
                matrix[0][j] = 0;
            }
        }
        
        // Set first column
        if (firstColHasZero) {
            for (int i = 0; i < m; i++) {
                matrix[i][0] = 0;
            }
        }
    }
}
```

## 40. Spiral Matrix
**Problem:** Given an m x n matrix, return all elements of the matrix in spiral order.

### Python Solution
```python
def spiralOrder(matrix):
    if not matrix:
        return []
        
    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    
    while top <= bottom and left <= right:
        # Traverse right
        for j in range(left, right + 1):
            result.append(matrix[top][j])
        top += 1
        
        # Traverse down
        for i in range(top, bottom + 1):
            result.append(matrix[i][right])
        right -= 1
        
        if top <= bottom:
            # Traverse left
            for j in range(right, left - 1, -1):
                result.append(matrix[bottom][j])
            bottom -= 1
            
        if left <= right:
            # Traverse up
            for i in range(bottom, top - 1, -1):
                result.append(matrix[i][left])
            left += 1
            
    return result
```

### Java Solution
```java
public class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> result = new ArrayList<>();
        if (matrix == null || matrix.length == 0) return result;
        
        int top = 0;
        int bottom = matrix.length - 1;
        int left = 0;
        int right = matrix[0].length - 1;
        
        while (top <= bottom && left <= right) {
            // Traverse right
            for (int j = left; j <= right; j++) {
                result.add(matrix[top][j]);
            }
            top++;
            
            // Traverse down
            for (int i = top; i <= bottom; i++) {
                result.add(matrix[i][right]);
            }
            right--;
            
            if (top <= bottom) {
                // Traverse left
                for (int j = right; j >= left; j--) {
                    result.add(matrix[bottom][j]);
                }
                bottom--;
            }
            
            if (left <= right) {
                // Traverse up
                for (int i = bottom; i >= top; i--) {
                    result.add(matrix[i][left]);
                }
                left++;
            }
        }
        
        return result;
    }
}
```

These solutions complete our set of 40 coding problems. Both problems demonstrate important concepts:

Problem 39 (Set Matrix Zeroes):
- Space optimization using the matrix itself as marker storage
- Handling edge cases with boolean flags
- In-place matrix modification

Problem 40 (Spiral Matrix):
- Matrix traversal in spiral order
- Boundary management
- Direction control using four pointers
- Handling rectangular matrices

