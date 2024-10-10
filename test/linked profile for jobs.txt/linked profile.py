


import os
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from linkedin_api import LinkedInAPI


# LinkedIn API credentials
CLIENT_ID = 'your_client_id'
CLIENT_SECRET = 'your_client_secret'



# Your LinkedIn profile link
PROFILE_LINK = '(link unavailable)'





# Set up Selenium WebDriver
driver = webdriver.Chrome()  # or webdriver.Firefox()



# Navigate to LinkedIn profile
driver.get(PROFILE_LINK)



# Define job search parameters
job_title = 'software engineer'
location = 'United States'
num_jobs = 100





# Search for jobs
driver.get(f'(link unavailable)')


# Apply to jobs
for i in range(num_jobs):
    job_card = driver.find_element_by_xpath(f'//ul[@class="jobs-search__results-list"]/li[{i+1}]')
    job_title = job_card.find_element_by_xpath('.//h3[@class="t-16 t-black t-bold"]').text
    job_link = job_card.find_element_by_xpath('.//a[@class="job-card__link"]').get_attribute('href')
    
    # Open job page in new tab
    driver.execute_script(f'window.open("{job_link}","_blank");')
    driver.switch_to.window(driver.window_handles[-1])
    
    # Apply to job
    apply_button = driver.find_element_by_xpath('//button[@data-control-name="job_details_apply_button"]')
    apply_button.click()
    
    # Fill out application form (if required)
    # Add your custom application form filling logic here
    
    # Submit application
    driver.find_element_by_xpath('//button[@type="submit"]').click()
    
    # Close job page tab
    driver.close()
    driver.switch_to.window(driver.window_handles[0])

    print(f'Applied to job {i+1}: {job_title}')


