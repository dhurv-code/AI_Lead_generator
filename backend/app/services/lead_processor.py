from app.services.scraper import scrape_website
from app.services.analyzer import analyze_content
from app.services.email_generator import generate_email
from app.database.lead_repository import save_lead
def process_lead(url):

    website_data = scrape_website(url)

    audit = analyze_content(
        website_data["content"]
    )

    email = generate_email(
        audit["business_type"],
        audit["issues"],
        audit["recommendations"]
    )

    audit["email"] = email
    audit["website"] = url
    save_lead(audit)

    return audit