import csv
import os
import shutil
import re

csv_path = "dental-clinic-in-lucknow-uttar-pradesh-india-overview - dental-clinic-in-lucknow-uttar-pradesh-india-overview.csv.csv"
output_dir = "generated_sites"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Helper to sanitize folder names
def sanitize_filename(name):
    return re.sub(r'[\\/*?:"<>|]', "", name).strip()

def process_html(html_path, row):
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replacements
    clinic_name = row.get('name', 'Dental Clinic').strip()
    owner_name = row.get('owner_name', '').strip()
    phone = row.get('phone', '').strip()
    address = row.get('address', '').strip()

    if not clinic_name:
        return

    # Titles and Brand
    content = content.replace("Twinkle Dental Care", clinic_name)
    
    # Sub title / owner
    if owner_name:
        content = content.replace("By Dr. Twinkle Khare", owner_name)
    else:
        content = content.replace("By Dr. Twinkle Khare", "Premium Dental Care")

    # Phone numbers
    if phone:
        # Strip spaces for the tel: link
        clean_phone = phone.replace(" ", "").replace("-", "")
        content = re.sub(r'tel:\+91\d+', f'tel:{clean_phone}', content)
        content = re.sub(r'\+91 70712 18786', phone, content)
    
    # Address
    if address:
        content = content.replace("Bijnor Road, Amar Shaheed Path, South Lucknow", address)

    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(content)

with open(csv_path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    count = 0
    for row in reader:
        name = row.get('name', '')
        if not name:
            continue
            
        if count >= 25:
            print("Safety limit reached. Stopping after 25 clinics to prevent massive disk usage (assets folder is ~35MB each). Modify the LIMIT in the script to run all.")
            break
            
        folder_name = sanitize_filename(name)
        target_path = os.path.join(output_dir, folder_name)
        
        if not os.path.exists(target_path):
            os.makedirs(target_path)
            
        # Copy the necessary files
        for item in ['index.html', 'style.css', 'script.js']:
            if os.path.exists(item):
                shutil.copy2(item, os.path.join(target_path, item))
                
        # Copy assets folder
        if os.path.exists('assets') and not os.path.exists(os.path.join(target_path, 'assets')):
            shutil.copytree('assets', os.path.join(target_path, 'assets'))
            
        # Modify html
        html_file = os.path.join(target_path, 'index.html')
        if os.path.exists(html_file):
            process_html(html_file, row)
            
        count += 1

print(f"Successfully generated {count} websites in '{output_dir}/' directory.")
