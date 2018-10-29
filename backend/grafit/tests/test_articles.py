from django.test import TestCase
from ..models import Article

class ArticleTest(TestCase):
    def setUp(self):
        Article.objects.create(title="TestTitle", text="TestText")

    def test_article_get(self):
        article = Article.objects.get(title="TestTitle")
        self.assertEqual(article.text, "TestText")
