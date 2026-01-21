#Assignments :

1. https://leetcode.com/problems/count-elements-with-maximum-frequency/description/
2. https://leetcode.com/problems/merge-sorted-array/description/




# Notes of the session on 17th November
1. For Loops in Java and Python:

```python
# Python for loop
for i in range(5):    # range(5) generates 0,1,2,3,4
    print(i)

# Python for loop with list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
```

```java
// Java for loop
for(int i = 0; i < 5; i++) {
    System.out.println(i);
}

// Java for-each loop
String[] fruits = {"apple", "banana", "cherry"};
for(String fruit : fruits) {
    System.out.println(fruit);
}
```

2. Array Reversal:

```python
# Python
def reverse_array(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr
```

```java
// Java
public static void reverseArray(int[] arr) {
    int left = 0, right = arr.length - 1;
    while(left < right) {
        int temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
}
```

3. Vowels and Consonants Count for Multiple Test Cases:

```python
def count_vowels_consonants(s):
    vowels = set('aeiouAEIOU')
    v_count = c_count = 0
    
    for char in s:
        if char.isalpha():
            if char in vowels:
                v_count += 1
            else:
                c_count += 1
    return v_count, c_count

# Handle multiple test cases
t = int(input())  # number of test cases
for _ in range(t):
    s = input()
    vowels, consonants = count_vowels_consonants(s)
    print(f"Vowels: {vowels}, Consonants: {consonants}")
```

4. ASCII Values:
- 'a' to 'z': 97 to 122
- 'A' to 'Z': 65 to 90
- '0' to '9': 48 to 57

5. Character Frequency Counter (including uppercase, lowercase, and digits):

```python
def count_all_chars():
    s = input("Enter string: ")
    # Create frequency array for all possible characters
    freq = [0] * 128  # for ASCII characters
    
    # Count frequency
    for char in s:
        freq[ord(char)] += 1
    
    # Print frequencies for letters and digits
    print("\nLowercase letters:")
    for i in range(97, 123):  # a to z
        if freq[i] > 0:
            print(f"{chr(i)}: {freq[i]}")
    
    print("\nUppercase letters:")
    for i in range(65, 91):   # A to Z
        if freq[i] > 0:
            print(f"{chr(i)}: {freq[i]}")
    
    print("\nDigits:")
    for i in range(48, 58):   # 0 to 9
        if freq[i] > 0:
            print(f"{chr(i)}: {freq[i]}")

# Example usage
count_all_chars()
```

Here's a sample output when input is "Hello123WORLD":
```
Lowercase letters:
e: 1
l: 2
o: 1

Uppercase letters:
H: 1
L: 1
O: 1
R: 1
W: 1
D: 1

Digits:
1: 1
2: 1
3: 1
```

Regarding memory:
- A char takes 1 byte (8 bits) of memory
- Can represent 256 different values [0, 255]
- Boolean theoretically needs only 1 bit, but computers typically allocate 1 byte as it's the smallest addressable unit of memory
- This is why boolean in most programming languages still uses 1 byte despite only needing 1 bit


# Formatted Strings 

I'll explain different ways to format strings in Python with clear examples.

1. Basic String Concatenation (oldest method):
```python
# Using + operator
first_name = "John"
age = 25
message = "Hello " + first_name + ", you are " + str(age) + " years old."
print(message)  # Output: Hello John, you are 25 years old.
```

2. String Format Method (%):
```python
# % operator (old style formatting)
name = "Alice"
age = 30
message = "Hello %s, you are %d years old." % (name, age)
print(message)  # Output: Hello Alice, you are 30 years old.
```

3. str.format() Method:
```python
# Using .format()
name = "Bob"
age = 35
message = "Hello {}, you are {} years old.".format(name, age)
print(message)  # Output: Hello Bob, you are 35 years old.

# Using indexed placeholders
message = "Hello {0}, you are {1} years old. Nice to meet you {0}!".format(name, age)
print(message)  # Output: Hello Bob, you are 35 years old. Nice to meet you Bob!

# Using named placeholders
message = "Hello {n}, you are {a} years old.".format(n=name, a=age)
print(message)  # Output: Hello Bob, you are 35 years old.
```

4. f-Strings (Python 3.6+) - Most Modern and Recommended:
```python
# Basic f-string
name = "Charlie"
age = 40
message = f"Hello {name}, you are {age} years old."
print(message)  # Output: Hello Charlie, you are 40 years old.

# f-strings with expressions
price = 49.99
quantity = 3
message = f"Total cost: ${price * quantity:.2f}"
print(message)  # Output: Total cost: $149.97

# f-strings with dictionaries
person = {"name": "David", "age": 45}
message = f"Hello {person['name']}, you are {person['age']} years old."
print(message)  # Output: Hello David, you are 45 years old.

# f-strings with method calls
name = "eric smith"
message = f"Welcome {name.title()}"
print(message)  # Output: Welcome Eric Smith

# f-strings with conditional expressions
age = 20
message = f"Status: {'Adult' if age >= 18 else 'Minor'}"
print(message)  # Output: Status: Adult
```

5. Real-world Examples:
```python
# Email template
user = {
    "name": "John Smith",
    "order_id": "A12345",
    "items": 3,
    "total": 149.99
}

email = f"""
Dear {user['name']},

Thank you for your order #{user['order_id']}!
You ordered {user['items']} items for a total of ${user['total']:.2f}.

Best regards,
The Store Team
"""
print(email)

# Formatting numbers
number = 1234567.89
formatted = f"{number:,.2f}"
print(formatted)  # Output: 1,234,567.89

# Table formatting
headers = ["Name", "Age", "City"]
data = [
    ["Alice", 25, "New York"],
    ["Bob", 30, "Los Angeles"],
    ["Charlie", 35, "Chicago"]
]

# Print formatted table
print(f"{'Name':<10} {'Age':<5} {'City':<15}")
print("-" * 30)
for row in data:
    print(f"{row[0]:<10} {row[1]:<5} {row[2]:<15}")

# Output:
# Name       Age   City           
# ------------------------------
# Alice      25    New York      
# Bob        30    Los Angeles   
# Charlie    35    Chicago       
```

Key Points about f-strings:
1. They start with 'f' or 'F' before the quotes
2. Can contain expressions inside curly braces {}
3. Support all string formatting operations
4. More readable and maintainable than older methods
5. Better performance than other string formatting methods
6. Can use any valid Python expressions inside the braces

Common Format Specifiers:
```python
number = 42.12345

# Width and alignment
print(f"|{number:10}|")    # Right-aligned with width 10
print(f"|{number:<10}|")   # Left-aligned
print(f"|{number:^10}|")   # Center-aligned

# Precision for floating-point numbers
print(f"{number:.2f}")     # Two decimal places

# Including signs
print(f"{number:+}")       # Always include sign
print(f"{number: }")       # Include space for positive numbers

# Different number formats
print(f"{number:e}")       # Scientific notation
print(f"{42:x}")          # Hexadecimal
print(f"{42:b}")          # Binary
print(f"{42:,}")          # Number with thousand separator
```

These formatting options make f-strings a powerful tool for creating clean, readable string output in Python. They're especially useful when working with data presentation, report generation, or any situation where you need to combine text with variable values.

