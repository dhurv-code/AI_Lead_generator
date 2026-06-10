import requests
from bs4 import BeautifulSoup
import re

def scrape_website(url:str):
    try:
        response=requests.get(url,timeout=10,
                              headers={"User-Agent":"Mozilla/5.0"})
        response.raise_for_status()
        soup=BeautifulSoup(response.text,"html.parser")
        title=soup.title.string if soup.title else "NO Title"

        for script in soup(["script","style"]):
            script.decompose()
        content=soup.get_text(separator=" ",strip=True)
        emails=list(set(re.findall(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",content)))
        phones=list(set(re.findall(r"\+?\d[\d\s().-]{8,}",content)))

        contact_pages=[]

        for link in soup.find_all("a",href=True):
            href=link["href"].lower()
            if any(keyword in href for keyword in["contact","contact-us","about"]):
                full_url=urljoin(url,link["href"])
                contact_pages.append(full_url)
        for page in contact_pages[:3]:
            try:

                page_response = requests.get(
                    page,
                    headers=headers,
                    timeout=10
                )

                page_soup = BeautifulSoup(
                    page_response.text,
                    "html.parser"
                )

                page_text = page_soup.get_text(
                    separator=" ",
                    strip=True
                )

                emails.update(
                    re.findall(
                        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
                        page_text
                    )
                )

                phones.update(
                    re.findall(
                        r"\+?\d[\d\s().-]{8,}",
                        page_text
                    )
                )

            except:
                pass
            
        return {
            "title":title,
            "content":content,
            "emails":emails,
            "phones":phones
        }
    except Exception as e:
        return{
            "error":str(e)
        }