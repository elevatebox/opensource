# Loop Practice Session - Teaching Guide

## Class Overview

Pages to Cover: 11-17 from [HackerRank Contest - Nirudhyog](https://www.hackerrank.com/contests/nirudhyog-preliminary-contest/challenges/filters/page:17)

### Instructor Note
For Pages 13-14:
- Explain complex problems in detail
- Students must complete all problems from pages 11-17 by next week


---

## Problem Set Breakdown

### 1. Multiples Printing (Basic Loop Practice)
**🕐 Time Allocation:**
- Student self-attempt: 5 minutes
- Discussion: 10 minutes

**Question 1A:**
```markdown
Write a program to print all multiples of 5 from 1 to 20.
Expected Output: 5 10 15 20
```

**Solution:**
```python
# Solution Approach 1 (For Loop):
for i in range(5, 21, 5):
    print(i, end=" ")

# Solution Approach 2 (While Loop):
i = 5
while i <= 20:
    print(i, end=" ")
    i += 5
```

**Question 1B:**
```markdown
Given a number N as input, print all multiples of N up to N*4.
Input: 3
Output: 3 6 9 12
```

**Solution:**
```python
n = int(input())
for i in range(1, 5):
    print(n * i, end=" ")
```

**Teaching Points:**
- Explain range(start, stop, step)
- Compare for vs while efficiency
- Discuss incrementation patterns

---

### 2. Frequency Counter Problems
**🕐 Time Allocation:**
- Student self-attempt: 10 minutes
- Discussion: 15 minutes

**Question 2A:**
```markdown
Write a program to find frequency of each element in an array.
Input: [1, 2, 2, 3, 1, 1]
Output: 1:3, 2:2, 3:1
```

**Solution:**
```python
arr = list(map(int, input().split()))
freq = {}
for num in arr:
    if num in freq:
        freq[num] += 1
    else:
        freq[num] = 1

for num, count in freq.items():
    print(f"{num}:{count}", end=" ")
```

**Question 2B:**
```markdown
Write a program to find frequency of each character in a string.
Input: "hello"
Output: h:1, e:1, l:2, o:1
```

**Solution:**
```python
s = input()
freq = {}
for char in s:
    freq[char] = freq.get(char, 0) + 1

for char, count in freq.items():
    print(f"{char}:{count}", end=" ")
```

**Teaching Points:**
- Dictionary as counter
- get() method vs if-else
- String iteration

---

### 3. Complex Number Analysis
**🕐 Time Allocation:**
- Student self-attempt: 15 minutes
- Discussion: 20 minutes

**Question 3:**
```markdown
Given T test cases, each containing a number N, perform the following operations:
1. Find the number of digits in N
2. Calculate sum of digits in N
3. Find absolute difference between sum of digits and number of digits
4. Check if sum of cubes of digits is prime
5. Count prime numbers between (number of digits) and (sum of digits)
   - If this count is prime, print "We learn't something"
   - Else print "It's waste of time"

Input Format:
First line: T (number of test cases)
Next T lines: One number N per line

Example:
Input:
2
123
456

Output for 123:
Number of digits: 3
Sum of digits: 6
Absolute difference: 3
It's not a prime number
We learn't something
```

**Solution:**
```python
def count_digits(n):
    count = 0
    while n > 0:
        count += 1
        n //= 10
    return count

def sum_of_digits(n):
    total = 0
    while n > 0:
        total += n % 10
        n //= 10
    return total

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

def sum_of_cubes(n):
    total = 0
    while n > 0:
        digit = n % 10
        total += digit ** 3
        n //= 10
    return total

def count_primes_in_range(start, end):
    count = 0
    for num in range(min(start, end), max(start, end) + 1):
        if is_prime(num):
            count += 1
    return count

# Main Solution
T = int(input())
for _ in range(T):
    N = int(input())
    
    num_digits = count_digits(N)
    digits_sum = sum_of_digits(N)
    diff = abs(digits_sum - num_digits)
    
    cube_sum = sum_of_cubes(N)
    print(f"Number of digits: {num_digits}")
    print(f"Sum of digits: {digits_sum}")
    print(f"Absolute difference: {diff}")
    
    if is_prime(cube_sum):
        print("It's a prime number")
    else:
        print("It's not a prime number")
        
    prime_count = count_primes_in_range(num_digits, digits_sum)
    if is_prime(prime_count):
        print("We learn't something")
    else:
        print("It's waste of time")
```

**Teaching Points:**
- Breaking complex problems into functions
- Importance of modular code
- Efficient prime number checking
- Range-based operations
- Multiple mathematical concepts in one problem

---

## Class Structure

### BN (90 minutes):
1. Introduction (10 mins)
   - Overview of pages 11-17
   - Problem-solving strategy
2. Problem Set 1 & 2 (50 mins)
3. Start Complex Problems (30 mins)

### AN (90 minutes):
1. Complete Complex Problems (45 mins)
2. Practice Session (30 mins)
3. Assignment & Questions (15 mins)

## Assessment Focus:
- Loop understanding
- Problem breakdown skills
- Code optimization
- Time management
- Clean coding practices

## Homework:
- Complete all problems from pages 11-17
- Focus on similar patterns
- Practice complex problems from pages 13-14

Remember to encourage:
- Independent problem-solving
- Multiple solution approaches
- Testing with different inputs
- Code optimization discussions
