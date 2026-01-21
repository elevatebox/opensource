# Prime Number Solutions Guide - From Brute Force to Optimal

## Problem: Check if a number is Prime
Given a number N, check if it's prime or not.

### 1. Brute Force Solution
**Time Complexity**: O(n)  
**Space Complexity**: O(1)
```python
def is_prime_v1(n):
    # Handle base cases
    if n < 2:
        return False
    if n == 2:
        return True
        
    # Check all numbers from 2 to n-1
    for i in range(2, n):
        if n % i == 0:
            return False
    return True

# Example usage
print(is_prime_v1(17))  # True
print(is_prime_v1(24))  # False
```
**Why it's inefficient:**
- Checks all numbers from 2 to n-1
- For large numbers, performs unnecessary checks

### 2. Square Root Optimization
**Time Complexity**: O(√n)  
**Space Complexity**: O(1)
```python
def is_prime_v2(n):
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
        
    # Check only up to square root
    for i in range(3, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True
```
**Improvement:**
- Only checks up to square root of n
- First even number check reduces iterations

### 3. Odd Numbers Only Optimization
**Time Complexity**: O(√n/2)  
**Space Complexity**: O(1)
```python
def is_prime_v3(n):
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
        
    # Check only odd numbers up to square root
    for i in range(3, int(n ** 0.5) + 1, 2):
        if n % i == 0:
            return False
    return True
```
**Improvement:**
- Checks only odd numbers
- Reduces number of iterations by half

### 4. Sieve of Eratosthenes (for multiple queries)
**Time Complexity**: O(n log log n) for preprocessing, O(1) for queries  
**Space Complexity**: O(n)
```python
def create_sieve(n):
    # Initialize sieve with True
    sieve = [True] * (n + 1)
    sieve[0] = sieve[1] = False
    
    # Mark non-primes
    for i in range(2, int(n ** 0.5) + 1):
        if sieve[i]:
            # Mark multiples as non-prime
            for j in range(i * i, n + 1, i):
                sieve[j] = False
                
    return sieve

def is_prime_v4(n, sieve):
    if n < len(sieve):
        return sieve[n]
    # Fall back to regular prime check for numbers outside sieve
    return is_prime_v3(n)

# Example usage
MAX_N = 1000000  # Adjust based on expected input range
sieve = create_sieve(MAX_N)
print(is_prime_v4(17, sieve))  # True
print(is_prime_v4(24, sieve))  # False
```
**Best for:**
- Multiple prime checks
- Numbers within a known range

### 5. Miller-Rabin Primality Test (for very large numbers)
**Time Complexity**: O(k log^3 n) where k is number of test iterations  
**Space Complexity**: O(1)
```python
def miller_rabin_test(n, k=5):
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
        
    # Write n-1 as 2^r * d
    r, d = 0, n - 1
    while d % 2 == 0:
        r += 1
        d //= 2
        
    # Witness loop
    for _ in range(k):
        a = random.randrange(2, n-1)
        x = pow(a, d, n)
        if x == 1 or x == n-1:
            continue
        for _ in range(r-1):
            x = (x * x) % n
            if x == n-1:
                break
        else:
            return False
    return True
```
**Best for:**
- Very large numbers
- Probabilistic but extremely accurate

### Comparison Table:

| Version | Time Complexity | Space Complexity | Best Use Case |
|---------|----------------|------------------|---------------|
| Brute Force | O(n) | O(1) | Small numbers, learning |
| Square Root | O(√n) | O(1) | Medium size numbers |
| Odd Numbers | O(√n/2) | O(1) | General purpose |
| Sieve | O(n log log n) + O(1) | O(n) | Multiple queries |
| Miller-Rabin | O(k log³ n) | O(1) | Very large numbers |

### Application Tips:

1. **For Interview Questions:**
   - Use Version 3 (Odd Numbers) by default
   - Easy to explain and implement
   - Good balance of efficiency and simplicity

2. **For Production Code:**
   - For numbers < 10⁶: Use Version 3
   - For multiple queries: Use Version 4 (Sieve)
   - For very large numbers: Use Version 5 (Miller-Rabin)

3. **For Competitive Programming:**
   - Have all versions ready
   - Choose based on constraints:
     - Single query → Version 3
     - Multiple queries → Version 4
     - Very large numbers → Version 5

### Common Follow-up Questions:

1. **How can we optimize space in Sieve?**
   - Use bit array instead of boolean array
   - Only store odd numbers
   - Use segmented sieve for large ranges

2. **How to handle very large ranges?**
```python
def segmented_sieve(low, high):
    # Create small sieve
    limit = int(high ** 0.5)
    base_primes = []
    sieve = [True] * (limit + 1)
    for i in range(2, int(limit ** 0.5) + 1):
        if sieve[i]:
            for j in range(i * i, limit + 1, i):
                sieve[j] = False
    for i in range(2, limit + 1):
        if sieve[i]:
            base_primes.append(i)
    
    # Process segments
    segment_size = 10**6
    for segment_start in range(low, high, segment_size):
        segment_end = min(segment_start + segment_size, high)
        segment = [True] * (segment_end - segment_start)
        
        for prime in base_primes:
            start = max(prime * prime, (segment_start + prime - 1) // prime * prime)
            for i in range(start, segment_end, prime):
                segment[i - segment_start] = False
                
        if segment_start <= 2 < segment_end:
            yield 2
        for i in range(max(3, segment_start) | 1, segment_end, 2):
            if segment[i - segment_start]:
                yield i
```

This comprehensive approach to prime numbers allows you to handle any scenario efficiently. The key is choosing the right approach based on your specific needs and constraints.
