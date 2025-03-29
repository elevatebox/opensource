# Session 1: Taking Inputs in Python and Basic Data Types

## Goal
Complete all problems on page numbers 11 and 12 of the HackerRank contest. Learn how to take inputs in Python, understand data types, and perform basic operations, with special focus on writing code without prompts for online judges.

## 1. Introduction to Input in Python
In Python, we use the `input()` function to take input from the user. By default, `input()` captures data as a string. Even if you enter a number, it will still be stored as a string, so we need to convert it (type cast) to the required data type, like int or float, if needed.

```python
value = input()  # Takes input as a string
print(value)
```

### Why Avoid Prompts in Online Judges
When solving problems on online judges, do not use prompts (like `input("Enter a number: ")`). Here's why:

1. **Input and Output Requirements**:
   - Online judges handle input and output in a controlled way
   - They provide input directly to your code
   - Extra prompts can cause solutions to fail test cases

2. **Automated Testing**:
   - Judges run solutions against multiple hidden test cases
   - Extra output won't match expected output

3. **Focus on Code Logic**:
   - Goal is to write precise input/output handling
   - Clean and efficient code is priority

4. **Consistency with Other Solutions**:
   - Makes solutions easier to compare and debug
   - Standardized format for evaluation

### Example Comparison

❌ Incorrect for online judge:
```python
a = int(input("Enter the first number: "))
b = int(input("Enter the second number: "))
print("The sum is:", a + b)
```

✅ Correct for online judge:
```python
a = int(input())
b = int(input())
print(a + b)
```

## 2. Type Casting
- **Implicit Type Casting**: Automatic conversion by Python
- **Explicit Type Casting**: Manual conversion using `int()`, `float()`, `str()`

Example:
```python
number = int(input())  # Converts the input string to an integer
print(number * 2)      # Correctly performs integer multiplication
```

## 3. Different Ways to Take Input

### a. Single Number
```python
a = int(input())
```

### b. Multiple Numbers on Same Line
```python
# For two numbers
a, b = map(int, input().split())

# For three numbers
a, b, c = map(int, input().split())
```

### c. More Than Three Numbers
```python
# Storing in a list
L = list(map(int, input().split()))
```

## 4. Basic Data Types in Python
- **Integer (int)**: `1, 2, 100`
- **Float (float)**: `1.5, 3.14`
- **String (str)**: `"Hello", "123"`

Example:
```python
num = 10        # int
pi = 3.14       # float
name = "Alice"  # string
```

## 5. Basic Data Structures

### Lists
```python
my_list = [1, 2, 3]
my_list.append(4)
print(my_list)
```

### Tuples
```python
my_tuple = (1, 2, 3)
print(my_tuple[1])
```

### Dictionaries
```python
my_dict = {"name": "Alice", "age": 25}
print(my_dict["name"])
```

## 6. Operations on Data Types

### Integer and Float Operations
```python
a = 10
b = 3
print(a + b)      # Addition
print(a / b)      # Division
print(a // b)     # Integer Division
print(a ** b)     # Exponentiation
```

### String Operations
```python
str1 = "Hello"
str2 = "World"
print(str1 + " " + str2)  # Concatenation
print(str1 * 3)           # Repetition
```

### List Operations
```python
my_list = [1, 2, 3]
my_list.append(4)
print(my_list)
my_list.pop()
print(my_list)
```

### Dictionary Operations
```python
person = {"name": "Alice", "age": 25}
person["age"] = 26
print(person)
```

## Conclusion
Students should now be equipped to handle input, work with various data types, and perform operations in Python. The focus on clean, prompt-free code will help them effectively tackle the HackerRank contest problems.
