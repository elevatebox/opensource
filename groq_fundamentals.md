# Groq API and Usage Guide

## Introduction
Groq is an AI platform that provides a powerful API for natural language processing tasks. This guide will walk you through the installation process, explain the code snippet provided, and demonstrate how to use the Groq API effectively.

## Installation
To use the Groq API, you need to install the `groq` Python package. You can install it using pip by running the following command:

```
pip install groq
```

Make sure you have Python and pip installed on your system before running the command.

## Code Explanation
Let's go through the provided code snippet and understand its functionality.

```python
import os
from groq import Groq

def ask_question(api_key):
    """Ask a straightforward question to the Groq API."""
    client = Groq(api_key=api_key)
    question = "What are the top 3 most interesting scientific discoveries of the last decade?"
    response = client.chat.completions.create(
        messages=[{"role": "user", "content": question}],
        model="mixtral-8x7b-32768"
    )
    
    print("Question:", question)
    print("\nResponse:", response.choices[0].message.content)

def main():
    api_key = "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"
    ask_question(api_key)

if __name__ == "__main__":
    main()
```


## System Prompt 

```
import os
from groq import Groq

def ask_question(api_key, question):
    """Ask a question to the Groq API."""
    client = Groq(api_key=api_key)
    system_prompt = """consider you are the best doctor in world help this question."""
    response = client.chat.completions.create(
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": question}
        ],
        model="mixtral-8x7b-32768"
    )
    
    print("\nResponse:", response.choices[0].message.content)

def main():
    api_key = "your_api"
    question = input("Enter your question: ")
    ask_question(api_key, question)

if __name__ == "__main__":
    main()
```
1. The code imports the necessary modules:
   - `os`: This module provides a way to interact with the operating system. However, it is not used in the provided code.
   - `Groq`: This class is imported from the `groq` module and is used to interact with the Groq API.

2. The `ask_question` function is defined, which takes an `api_key` as a parameter. This function is responsible for sending a question to the Groq API and retrieving the response.
   - Inside the function, a `Groq` client is instantiated using the provided `api_key`.
   - A `question` variable is defined with a specific question as a string.
   - The `client.chat.completions.create` method is called to send the question to the Groq API. The question is passed as a message with the role "user", and the model "mixtral-8x7b-32768" is specified.
   - The question and the response from the API are printed using `print` statements. The response is accessed through `response.choices[0].message.content`.

3. The `main` function is defined, which serves as the entry point of the program.
   - Inside the `main` function, an `api_key` variable is defined with the actual API key as a string. Make sure to replace it with your own API key.
   - The `ask_question` function is called with the `api_key` as an argument.

4. The `if __name__ == "__main__":` block is used to check if the script is being run directly (not imported as a module). If true, the `main` function is called, effectively starting the execution of the program.

## Usage
To use the Groq API with the provided code, follow these steps:

1. Sign up for a Groq account and obtain an API key.
2. Replace the `api_key` variable in the `main` function with your actual API key.
3. Run the script using a Python interpreter.

The script will send the specified question to the Groq API and print the response.

## Customization
You can customize the code to ask different questions or use different models:

- To ask a different question, modify the `question` variable inside the `ask_question` function.
- To use a different model, change the `model` parameter in the `client.chat.completions.create` method call.

## Conclusion
This guide provided an overview of the Groq API, installation instructions, and a detailed explanation of the code snippet. With this knowledge, you can start using the Groq API to build powerful natural language processing applications. Remember to handle your API key securely and refer to the Groq documentation for more advanced features and options.
