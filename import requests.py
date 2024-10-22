import requests
from bs4 import BeautifulSoup

# Sample HTML content containing multiple job listings
html_content = '''
<ul>
    <li class="my-2 flex h-auto w-full flex-col flex-nowrap rounded border border-[#ccc] bg-beige-lighter px-5 py-3">
        <div class="mb-1 flex flex-col flex-nowrap items-center justify-between gap-y-2 md:flex-row md:gap-y-0">
            <a href="/companies/peakflo" class="shrink-0 md:mr-5">
                <img class="h-16 w-16 rounded-full" src="https://bookface-images.s3.amazonaws.com/small_logos/f59b4fa6c1b83c6d1b9ccf4e02733f3f60a7a727.png" alt="">
            </a>
            <div class="flex-1 text-center md:text-left">
                <a class="justify-start leading-loose" href="/companies/peakflo">
                    <span class="block font-bold md:inline">Peakflo (W22)</span>
                    <span class="hidden text-gray-500 md:inline">&nbsp;•&nbsp;</span>
                    <span class="text-gray-700 md:mr-2">Bill.com for SE Asia</span>
                    <span class="hidden text-sm text-gray-400 md:inline">(7 minutes ago)</span>
                </a>
                <div>
                    <a href="/companies/peakflo/jobs/AVGM7Hy-frontend-engineer-intern-india-remote" class="font-semibold text-linkColor">Frontend Engineer - Intern (India/Remote)</a>
                </div>
                <div class="flex flex-row flex-wrap justify-center md:justify-start">
                    <div class="border-r border-gray-300 px-2 first-of-type:pl-0 last-of-type:border-none last-of-type:pr-0">Internship</div>
                    <div class="border-r border-gray-300 px-2 first-of-type:pl-0 last-of-type:border-none last-of-type:pr-0">IN / Remote (IN)</div>
                    <div class="border-r border-gray-300 px-2 first-of-type:pl-0 last-of-type:border-none last-of-type:pr-0">Frontend</div>
                </div>
            </div>
            <div class="mt-3 shrink-0 grow-0 md:ml-5 md:mt-0">
                <a href="https://account.ycombinator.com/authenticate?continue=https%3A%2F%2Fwww.workatastartup.com%2Fapplication%3Fsignup_job_id%3D69639&amp;defaults%5BsignUpActive%5D=true&amp;defaults%5Bwaas_company%5D=25317" target="_blank" class="ycdc-btn ycdc-btn-sm border-brand-200 hover:bg-brand-600">Apply</a>
            </div>
        </div>
    </li>
    <!-- Additional job listings can be added here -->
</ul>
'''

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(html_content, 'html.parser')

# Find all job listings
job_listings = soup.find_all('li', class_='my-2 flex h-auto w-full flex-col flex-nowrap rounded border border-[#ccc] bg-beige-lighter px-5 py-3')

# Check if any job listings were found
if not job_listings:
    print("No jobs found.")
else:
    # Loop through each job listing and extract details
    for job in job_listings:
        # Extract the company name
        company_name = job.find('span', class_='block font-bold md:inline').text.strip()

        # Extract the job title and link
        job_title = job.find('a', class_='font-semibold text-linkColor').text.strip()
        job_link = job.find('a', class_='font-semibold text-linkColor')['href']

        # Extract the description
        description = job.find('span', class_='text-gray-700 md:mr-2').text.strip()

        # Extract the job type, location, and job category
        job_type = job.find_all('div', class_='border-r border-gray-300 px-2 first-of-type:pl-0 last-of-type:border-none last-of-type:pr-0')[0].text.strip()
        location = job.find_all('div', class_='border-r border-gray-300 px-2 first-of-type:pl-0 last-of-type:border-none last-of-type:pr-0')[1].text.strip()
        category = job.find_all('div', class_='border-r border-gray-300 px-2 first-of-type:pl-0 last-of-type:border-none last-of-type:pr-0')[2].text.strip()

        # Print the extracted data
        print(f"Company Name: {company_name}")
        print(f"Job Title: {job_title}")
        print(f"Job Link: {job_link}")
        print(f"Description: {description}")
        print(f"Job Type: {job_type}")
        print(f"Location: {location}")
        print(f"Category: {category}")
        print("-" * 40)  # Separator for clarity