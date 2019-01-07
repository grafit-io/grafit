from ..crawler.source import Source
import logging
import re
import html2text

logger = logging.getLogger()
logger.setLevel(logging.INFO)


class Crawler:

    def __init__(self):
        self.text_maker = html2text.HTML2Text()
        self.text_maker.ignore_links = True
        self.text_maker.skip_internal_links = True
        self.text_maker.bypass_tables = True
        self.text_maker.ignore_anchors = True
        self.text_maker.ignore_emphasis = True
        self.text_maker.ignore_tables = True
        self.text_maker.single_line_break = True
        self.text_maker.ignore_images = True

    def getWebContent(self, articleText: str) -> str:
        content = ""
        sources = Crawler.__extractURL(articleText)

        for source in sources:
            content += source.getContent(self.text_maker)
        return content

    @staticmethod
    def __extractURL(content: str) -> list:
        urlRegex = r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+'
        urls = re.findall(urlRegex, content)
        return list({Source(url) for url in urls})
