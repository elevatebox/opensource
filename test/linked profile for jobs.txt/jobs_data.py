import requests
from bs4 import BeautifulSoup
import pandas as pd

base_url = "https://www.google.com/about/careers/applications/jobs/results?location=India&page={}"

def get_job_data(job_counter):
    jobs = []
    page_num = 1
    
    while True:
        page_url = base_url.format(page_num)
        response = requests.get(page_url)
        soup = BeautifulSoup(response.content, "html.parser")

        job_elements = soup.select(".sMn82b") 

        if not job_elements:
            
            break

        for job_element in job_elements:
            title_element = job_element.select_one(".QJPWVe")
            title = title_element.text.strip() if title_element else "N/A"

            company_element = job_element.select_one(".RP7SMd")
            company = company_element.text.strip() if company_element else "N/A"

            location_element = job_element.select_one(".pwO9Dc, .vo5qdf")
            location = location_element.text.strip() if location_element else "N/A"

            job_type_element = job_element.select_one(".RP7SMd")
            job_type = job_type_element.text.strip() if job_type_element else "N/A"

            jobs.append({
                "job_number": job_counter,
                "title": title,
                "company": company,
                "location": location,
                "job_type": job_type
            })
            job_counter += 1

        page_num += 1

    return jobs

#to keep tabs on number of jobs scraped <<
job_counter = 1

#call the function (I definetely did not forget this myself)
job_data = get_job_data(job_counter)

df = pd.DataFrame(job_data)
#save as JSON
df.to_json("job_data.json", orient="records", indent=4)

print("Job data saved to job_data.json")