# Task: Web Scraping Assignment

## Objective:
To scrape the **Adobe Creative Cloud** URL and extract the specific text:  
**"Start your Creative Cloud free trial."**

URL to scrape:  
[https://www.adobe.com/in/creativecloud.html](https://www.adobe.com/in/creativecloud.html)

### Requirements:
- Use **`requests`** library to make HTTP requests.
- Use **`BeautifulSoup`** from the **`bs4`** library to parse the HTML and extract the required data.
- Write a Python script that:
  1. Scrapes the specific phrase `"Start your Creative Cloud free trial."` from the webpage.
  2. Prints the extracted data in the console.

---

## Sample Code for Web Scraping:

```python
import requests
from bs4 import BeautifulSoup

# URL to be scraped
url = 'https://www.adobe.com/in/creativecloud.html'

# Send a GET request to fetch the HTML content
response = requests.get(url)

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.text, 'html.parser')

# Find the text 'Start your Creative Cloud free trial'
free_trial_text = soup.find(text="Start your Creative Cloud free trial.")

# Print the extracted data
if free_trial_text:
    print("Extracted Text: ", free_trial_text)
else:
    print("Text not found.")
