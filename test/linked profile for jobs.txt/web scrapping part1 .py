import requests
from bs4 import BeautifulSoup
import pandas as pd
import json

# URL to scrape
url = "https://www.ycombinator.com/companies/peakflo/jobs/AVGM7Hy-frontend-engineer-intern-india-remote"

# Send a GET request to the URL
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# Initialize a dictionary to store job data
job_data = {}

# Extracting company name
company_name = soup.find('h1', class_='company-name').get_text(strip=True) if soup.find('h1', class_='company-name') else 'N/A'

# Extracting job title
job_title = soup.find('h2', class_='job-title').get_text(strip=True) if soup.find('h2', class_='job-title') else 'N/A'

# Extracting payment details
payment = soup.find('span', class_='job-compensation').get_text(strip=True) if soup.find('span', class_='job-compensation') else 'N/A'

# Extracting job description
job_description = soup.find('div', class_='job-description').get_text(strip=True) if soup.find('div', class_='job-description') else 'N/A'

# Store the data in the dictionary
job_data = {
    'Company Name': company_name,
    'Job Title': job_title,
    'Payment': payment,
    'Job Description': job_description
}

# Print the job data
print(job_data)

# Save to JSON file
with open('job_details.json', 'w') as json_file:
    json.dump(job_data, json_file, indent=4)

# Save to CSV file
df = pd.DataFrame([job_data])  # Wrap in a list to create a DataFrame
df.to_csv('job_details.csv', index=False)

print("Job details have been scraped and saved to job_details.json and job_details.csv")
