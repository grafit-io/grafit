from django.test import TestCase

from ..models import Article, Workspace


class ArticleTest(TestCase):
    def setUp(self):
        workspace = Workspace(name="Testworkspace", initials="TE")
        workspace.save()
        Article.objects.create(title="TestTitle", text="TestText", workspace=workspace)

    def test_article_get(self):
        article = Article.objects.get(title="TestTitle")
        self.assertEqual(article.text, "TestText")
