import logging
import html2text
import requests

logger = logging.getLogger()
logger.setLevel(logging.INFO)

class Source:
    def __init__(self, url: str):
        self.url = url

    def getContent(self, HTML2Text) -> str:
        logger.info(f"Crawling: {self.url}")
        request = requests.get(self.url)
        return  HTML2Text.handle(request.text)
