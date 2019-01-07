from django.test import TestCase
from grafit.crawler.crawler import Crawler


class CrawlerTest(TestCase):
    def test_crawler_no_content(self):
        crawler = Crawler()
        webContent = crawler.getWebContent("Nothing with any URL")
        self.assertEqual(webContent, "")

    def test_crawler_not_reachable_url(self):
        crawler = Crawler()
        webContent = crawler.getWebContent("Not existing URL https://www.dauiwrbn239hraoiwezfh.com/alsdäflqwäekf and some more text")
        self.assertEqual(webContent, "")

    def test_extractUrl_none(self):
        text = ""
        sourceList = Crawler._Crawler__extractURL(text)
        self.assertFalse(sourceList)

    def test_extractUrl_signle(self):
        text = "https://grafit.io/"
        sourceList = Crawler._Crawler__extractURL(text)

        self.assertEqual(sourceList[0].url, "https://grafit.io/")

    def test_extractUrl_multiple(self):
        text = "Some content is https://grafit.io/ and http://www.hslu.ch"
        sourceList = Crawler._Crawler__extractURL(text)

        self.assertEqual(len(sourceList), 2)