from app.services.scraper import scrape_website
from app.services.analyzer import analyze_content
from app.services.email_generator import generate_email
from app.services.lead_processor import process_lead
import pandas as pd

def process_csv(file_path):
    df=pd.read_csv(file_path)
    urls=df["website"].tolist()
    results=[]

    for url in urls:
        results.append({
            process_lead(url)
        })

    return results