import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import re

BASE_URL = "https://siddpatel.com"
VISITED = set()
TEXT_DATA = []

PHONE_REGEX = re.compile(r"\+?\d[\d\s\-]{7,}\d")

def is_internal(url):
    return urlparse(url).netloc == urlparse(BASE_URL).netloc

def clean_text(text):
    # remove phone numbers
    text = PHONE_REGEX.sub("", text)
    return text.strip()

def crawl(url):
    if url in VISITED:
        return
    VISITED.add(url)

    try:
        res = requests.get(url, timeout=10)
        if res.status_code != 200:
            return
    except:
        return

    soup = BeautifulSoup(res.text, "html.parser")

    # remove script/style/nav/footer
    for tag in soup(["script", "style", "nav", "footer", "header"]):
        tag.decompose()

    page_text = soup.get_text(separator=" ", strip=True)
    page_text = clean_text(page_text)

    if len(page_text) > 200:
        TEXT_DATA.append(page_text)

    # find internal links
    for a in soup.find_all("a", href=True):
        link = urljoin(url, a["href"])
        if is_internal(link) and link.startswith(BASE_URL):
            crawl(link)

def main():
    crawl(BASE_URL)

    # add explicit personal info (safe)
    TEXT_DATA.append("""
    Name: Siddhant Patel
    Email: spatel44427777@gmail.com
    GitHub: https://github.com/thesiddhantpatel
    Resume: https://resume.siddpatel.com
    Skills: Java, Python, AWS, Generative AI, Full Stack (MERN), Docker, n8n
    """)

    print(f"Crawled {len(VISITED)} pages")
    return TEXT_DATA

if __name__ == "__main__":
    data = main()
    for i, d in enumerate(data[:2]):
        print(f"--- Sample {i+1} ---")
        print(d[:300])
