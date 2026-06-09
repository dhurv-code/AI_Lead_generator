import requests
from bs4 import BeautifulSoup

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
        return {
            "title":title,
            "content":content[:10000]
        }
    except Exception as e:
        return{
            "error":str(e)
        }