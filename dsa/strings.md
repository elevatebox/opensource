# Comprehensive Guide: 31 String Problems in Java

## 1. Remove All Occurrences of a Character

### Solution 1: Using StringBuilder
```java
public String removeCharacter(String str, char ch) {
    StringBuilder result = new StringBuilder();
    for (char c : str.toCharArray()) {
        if (c != ch) {
            result.append(c);
        }
    }
    return result.toString();
}
```
- **Time Complexity**: O(n)
- **Space Complexity**: O(n)
- **Explanation**: Creates new string by appending non-matching chars

### Solution 2: Using Character Array (In-place)
```java
public String removeCharacterInPlace(String str, char ch) {
    char[] chars = str.toCharArray();
    int writeIndex = 0;
    
    for (int readIndex = 0; readIndex < chars.length; readIndex++) {
        if (chars[readIndex] != ch) {
            chars[writeIndex++] = chars[readIndex];
        }
    }
    return new String(chars, 0, writeIndex);
}
```
- **Time Complexity**: O(n)
- **Space Complexity**: O(1) excluding output
- **Explanation**: Uses two pointers for in-place modification

## 2. Replace Spaces with '%20'

### Solution 1: Using StringBuilder
```java
public String replaceSpaces(String str) {
    StringBuilder result = new StringBuilder();
    for (char c : str.toCharArray()) {
        if (c == ' ') {
            result.append("%20");
        } else {
            result.append(c);
        }
    }
    return result.toString();
}
```
- **Time Complexity**: O(n)
- **Space Complexity**: O(n)

### Solution 2: In-place Replacement
```java
public String replaceSpacesInPlace(String str) {
    // First count spaces to calculate final length
    int spaceCount = 0;
    for (char c : str.toCharArray()) {
        if (c == ' ') spaceCount++;
    }
    
    char[] chars = new char[str.length() + spaceCount * 2];
    int index = chars.length - 1;
    
    // Fill from right to left
    for (int i = str.length() - 1; i >= 0; i--) {
        if (str.charAt(i) == ' ') {
            chars[index--] = '0';
            chars[index--] = '2';
            chars[index--] = '%';
        } else {
            chars[index--] = str.charAt(i);
        }
    }
    return new String(chars);
}
```
- **Time Complexity**: O(n)
- **Space Complexity**: O(1) excluding output
- **Explanation**: Calculates space needed and fills from right to left

## 3. Longest Substring Without Repeating Characters

### Solution 1: Brute Force
```java
public int lengthOfLongestSubstringBrute(String s) {
    int maxLength = 0;
    for (int i = 0; i < s.length(); i++) {
        for (int j = i; j < s.length(); j++) {
            if (isUnique(s, i, j)) {
                maxLength = Math.max(maxLength, j - i + 1);
            }
        }
    }
    return maxLength;
}

private boolean isUnique(String s, int start, int end) {
    Set<Character> seen = new HashSet<>();
    for (int i = start; i <= end; i++) {
        if (!seen.add(s.charAt(i))) return false;
    }
    return true;
}
```
- **Time Complexity**: O(n³)
- **Space Complexity**: O(min(m,n)) where m is charset size

### Solution 2: Sliding Window with HashSet
```java
public int lengthOfLongestSubstring(String s) {
    Set<Character> chars = new HashSet<>();
    int maxLength = 0;
    int left = 0;
    
    for (int right = 0; right < s.length(); right++) {
        while (chars.contains(s.charAt(right))) {
            chars.remove(s.charAt(left));
            left++;
        }
        chars.add(s.charAt(right));
        maxLength = Math.max(maxLength, right - left + 1);
    }
    return maxLength;
}
```
- **Time Complexity**: O(n)
- **Space Complexity**: O(min(m,n))
- **Explanation**: Uses sliding window with HashSet for uniqueness check

### Solution 3: Sliding Window with HashMap (Optimal)
```java
public int lengthOfLongestSubstringOptimal(String s) {
    Map<Character, Integer> lastIndex = new HashMap<>();
    int maxLength = 0;
    int left = 0;
    
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (lastIndex.containsKey(c)) {
            left = Math.max(left, lastIndex.get(c) + 1);
        }
        lastIndex.put(c, right);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    return maxLength;
}
```
- **Time Complexity**: O(n)
- **Space Complexity**: O(min(m,n))
- **Explanation**: Optimizes sliding window by tracking last positions

## 4. String Rotation

### Solution 1: Using String Concatenation
```java
public String rotateString(String s, int k) {
    if (s == null || s.length() == 0) return s;
    k = k % s.length(); // normalize k
    return s.substring(k) + s.substring(0, k);
}
```
- **Time Complexity**: O(n)
- **Space Complexity**: O(n)

### Solution 2: Reversal Algorithm (In-place)
```java
public void rotateString(char[] str, int k) {
    if (str == null || str.length == 0) return;
    k = k % str.length;
    
    reverse(str, 0, k - 1);
    reverse(str, k, str.length - 1);
    reverse(str, 0, str.length - 1);
}

private void reverse(char[] str, int start, int end) {
    while (start < end) {
        char temp = str[start];
        str[start] = str[end];
        str[end] = temp;
        start++;
        end--;
    }
}
```
- **Time Complexity**: O(n)
- **Space Complexity**: O(1)
- **Explanation**: Uses three reversals to achieve rotation

## 5. Valid Shuffle Check

### Solution 1: Using Sort and Compare
```java
public boolean isValidShuffle(String first, String second, String result) {
    if (first.length() + second.length() != result.length()) return false;
    
    char[] firstArr = first.toCharArray();
    char[] secondArr = second.toCharArray();
    char[] resultArr = result.toCharArray();
    
    Arrays.sort(firstArr);
    Arrays.sort(secondArr);
    Arrays.sort(resultArr);
    
    int i = 0, j = 0, k = 0;
    while (k < resultArr.length) {
        if (i < firstArr.length && firstArr[i] == resultArr[k]) {
            i++;
        } else if (j < secondArr.length && secondArr[j] == resultArr[k]) {
            j++;
        } else {
            return false;
        }
        k++;
    }
    return true;
}
```
- **Time Complexity**: O(n log n) due to sorting
- **Space Complexity**: O(n)

### Solution 2: Using Count Array (Optimal)
```java
public boolean isValidShuffleOptimal(String first, String second, String result) {
    if (first.length() + second.length() != result.length()) return false;
    
    int[] charCount = new int[256];
    
    // Count characters in first and second strings
    for (char c : first.toCharArray()) charCount[c]++;
    for (char c : second.toCharArray()) charCount[c]++;
    
    // Verify counts match result
    for (char c : result.toCharArray()) {
        if (--charCount[c] < 0) return false;
    }
    return true;
}
```
- **Time Complexity**: O(n)
- **Space Complexity**: O(1) as array size is fixed

## 6. Character Frequency Count

### Solution 1: Using HashMap
```java
public Map<Character, Integer> countChars(String str) {
    Map<Character, Integer> frequency = new HashMap<>();
    for (char c : str.toCharArray()) {
        frequency.put(c, frequency.getOrDefault(c, 0) + 1);
    }
    return frequency;
}
```
- **Time Complexity**: O(n)
- **Space Complexity**: O(k) where k is unique chars

### Solution 2: Using Array (for ASCII)
```java
public int[] countCharsArray(String str) {
    int[] frequency = new int[256];  // for ASCII
    for (char c : str.toCharArray()) {
        frequency[c]++;
    }
    return frequency;
}
```
- **Time Complexity**: O(n)
- **Space Complexity**: O(1) as array size is fixed

## 7. Longest Palindromic Substring

### Solution 1: Brute Force
```java
public String longestPalindromeBrute(String s) {
    String longest = "";
    for (int i = 0; i < s.length(); i++) {
        for (int j = i; j < s.length(); j++) {
            if (isPalindrome(s, i, j) && j - i + 1 > longest.length()) {
                longest = s.substring(i, j + 1);
            }
        }
    }
    return longest;
}

private boolean isPalindrome(String s, int start, int end) {
    while (start < end) {
        if (s.charAt(start++) != s.charAt(end--)) return false;
    }
    return true;
}
```
- **Time Complexity**: O(n³)
- **Space Complexity**: O(1)

### Solution 2: Dynamic Programming
```java
public String longestPalindromeDP(String s) {
    if (s == null || s.length() < 2) return s;
    
    int n = s.length();
    boolean[][] dp = new boolean[n][n];
    int start = 0, maxLength = 1;
    
    // All single characters are palindromes
    for (int i = 0; i < n; i++) {
        dp[i][i] = true;
    }
    
    // Check for length 2
    for (int i = 0; i < n - 1; i++) {
        if (s.charAt(i) == s.charAt(i + 1)) {
            dp[i][i + 1] = true;
            start = i;
            maxLength = 2;
        }
    }
    
    // Check for lengths greater than 2
    for (int len = 3; len <= n; len++) {
        for (int i = 0; i < n - len + 1; i++) {
            int j = i + len - 1;
            if (s.charAt(i) == s.charAt(j) && dp[i + 1][j - 1]) {
                dp[i][j] = true;
                if (len > maxLength) {
                    start = i;
                    maxLength = len;
                }
            }
        }
    }
    return s.substring(start, start + maxLength);
}
```
- **Time Complexity**: O(n²)
- **Space Complexity**: O(n²)

### Solution 3: Expand Around Center (Optimal)
```java
public String longestPalindrome(String s) {
    if (s == null || s.length() < 2) return s;
    
    int start = 0, maxLength = 1;
    
    for (int i = 0; i < s.length(); i++) {
        int len1 = expandAroundCenter(s, i, i);     // odd length
        int len2 = expandAroundCenter(s, i, i + 1); // even length
        int len = Math.max(len1, len2);
        
        if (len > maxLength) {
            start = i - (len - 1) / 2;
            maxLength = len;
        }
    }
    return s.substring(start, start + maxLength);
}

private int expandAroundCenter(String s, int left, int right) {
    while (left >= 0 && right < s.length() && 
           s.charAt(left) == s.charAt(right)) {
        left--;
        right++;
    }
    return right - left - 1;
}
```
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- **Explanation**: Most efficient approach for this problem

