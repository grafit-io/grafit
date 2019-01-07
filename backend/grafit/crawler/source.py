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
        try:
            request = requests.get(self.url, timeout=5)
            request.raise_for_status()

            content_type = request.headers.get('content-type')
            if 'application/pdf' in content_type:
                logger.info(f"Failed to crawl: Content type {content_type}")
                return ""
            if 'application' in content_type:
                logger.info(f"Failed to crawl: Content type {content_type}")
                return ""

            return HTML2Text.handle(request.text)
        except Exception:
            logger.info(f"Failed to crawl: {self.url}")

        return ""
