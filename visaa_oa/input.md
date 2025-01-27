# Taking Integer Input in Python

## Single Integer Input
To take a single integer input in Python, you can use the `int()` function with the `input()` function:

```python
num = int(input())
```

This will store the user's input as an integer value in the variable `num`.

## Multiple Integer Inputs
If you want to take multiple integer inputs on a single line, you can use the `map()` function along with `input().split()`:

```python
n, m = map(int, input().split())
```

This will store the first input as `n` and the second input as `m`, both as integers.

## List of Integers
If you need to take more than 3 integer inputs on a single line, it's generally recommended to store them as a list:

```python
nums = list(map(int, input().split()))
```

This will create a list `nums` containing all the integer values entered by the user.
