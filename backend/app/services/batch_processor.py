from app.services.scraper import scrape_website
from app.services.analyzer import analyze_content
from app.services.email_generator import generate_email

def process_csv(file_path):
    df=pd.read_csv(file_path)
    urls=df["website"].tolist()
    results=[]

    for url in urls:
        website_data=scrape_website(url)
        audit=analyze_content(website_data["content"])

        email=generate_email(
            audit["business_type"],
            audit["issues"],
            audit["recommendation"]
        )
        results.append({
            "website":url,
            "audit":audit,
            "email":email
        })

    return results