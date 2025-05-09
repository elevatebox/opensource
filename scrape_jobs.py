from bs4 import BeautifulSoup

# Sample HTML  content (make sure it matches the actual structure of the webpage)
html_content = '''
<h2 class="p1N2lc">Digital Business Marketing Apprenticeship, March 2025 Start (English)</h2>
<span>Intern and Apprentice</span>
<span class="r0wTof ">Hyderabad, Telangana, India</span>
<span>Google</span>
<span class="BVHzed">; +3 more</span>
<ul>
<li>Bachelor's degree or equivalent practical experience.</li>
<li>Maximum 1 year of experience in a Digital Business Marketing role post graduation.</li>
<li>Experience with using Google Workspace (e.g., Gmail, Chrome, Docs, Sheets, etc.) or similar applications.<br></li>
<li>Ability to communicate in English fluently, to understand and execute instructions and learn via training documentations and presentations.<br></li>
</ul>
'''

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(html_content, 'html.parser')

# Safely extract the job title
job_title = soup.find('h2', class_='p1N2lc')
job_title = job_title.text.strip() if job_title else "Job Title Not Found"

# Safely extract the position type
position_type = soup.find_all('span')[0].text.strip() if soup.find_all('span') else "Position Type Not Found"

# Safely extract the location
location = soup.find('span', class_='r0wTof ')
location = location.text.strip() if location else "Location Not Found"

# Safely extract the company name
company_name = soup.find_all('span')[2].text.strip() if len(soup.find_all('span')) >= 3 else "Company Not Found"

# Safely extract qualifications from the list
qualifications = [li.text.strip() for li in soup.find_all('li')] if soup.find_all('li') else ["No qualifications found"]

# Print the extracted data
print(f"Job Title: {job_title}")
print(f"Position Type: {position_type}")
print(f"Location: {location}")
print(f"Company: {company_name}")
print("Qualifications:")
for i, qualification in enumerate(qualifications, 1):
    print(f"{i}. {qualification}")

