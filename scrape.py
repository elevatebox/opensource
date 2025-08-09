import requests
from bs4 import BeautifulSoup
import csv
import json

def fetch_html(url):
    """Fetch HTML content from the given URL."""
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        print(f"Failed to retrieve page with status code: {response.status_code}")
        return None

def parse_job_listings(html):
    """Parse job listings from the fetched HTML content."""
    soup = BeautifulSoup(html, 'html.parser')
    job_listings = soup.find_all('div', class_='sMn82b')  # Updated to new job listings class

    jobs_data = []
    
    for job in job_listings:
        job_data = {
            "Job Role": extract_job_role(job),
            "Company Name": extract_company_name(job),
            "Description": extract_description(job),
            "Location": extract_location(job),
        }
        jobs_data.append(job_data)
    
    return jobs_data

def extract_job_role(job):
    """Extract job role from the job listing."""
    job_role_element = job.find('h3', class_='QJPWVe')
    return job_role_element.text.strip() if job_role_element else "Job role not found"

def extract_company_name(job):
    """Extract company name from the job listing."""
    return "Google"  # Hardcoded since all jobs are from Google

def extract_description(job):
    """Extract job description from the job listing."""
    description_element = job.find('div', class_='Xsxa1e')
    return description_element.text.strip() if description_element else "Description not found"

def extract_location(job):
    """Extract location from the job listing."""
    location_element = job.find('span', class_='pwO9Dc vo5qdf')
    return ", ".join([span.text.strip() for span in location_element.find_all('span', class_='r0wTof')]) if location_element else "Location not found"

def save_to_csv(jobs_data, filename):
    """Save the job data to a CSV file."""
    with open(filename, mode='w', newline='', encoding='utf-8') as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=jobs_data[0].keys())
        writer.writeheader()
        for job in jobs_data:
            writer.writerow(job)

def save_to_json(jobs_data, filename):
    """Save the job data to a JSON file."""
    with open(filename, 'w', encoding='utf-8') as json_file:
        json.dump(jobs_data, json_file, ensure_ascii=False, indent=4)

# Main code execution
url = "https://www.google.com/about/careers/applications/jobs/results/?location=India"
html = fetch_html(url)

if html:
    jobs_data = parse_job_listings(html)

    if jobs_data:
        save_to_csv(jobs_data, "google_jobs.csv")
        save_to_json(jobs_data, "google_jobs.json")
        print("Data saved to google_jobs.csv and google_jobs.json.")
    else:
        print("No job listings found.")
