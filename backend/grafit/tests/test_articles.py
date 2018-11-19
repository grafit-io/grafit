from rest_framework.test import force_authenticate, APITestCase, APIClient
from django.urls import reverse

from ..models import Article, Workspace, User


class ArticleTest(APITestCase):
    def setUp(self):
        test_user = User.objects.create_user('testuser', 'test@example.com', 'testpassword')
        workspace = Workspace(name="Testworkspace", initials="TE")
        workspace.save()
        workspace.users.add(test_user)

        Article.objects.all().delete()
        Article.objects.create(title="TestTitle", text="TestText", workspace=workspace)

        self.client = APIClient()
        user = User.objects.get(username='testuser')
        self.client.force_authenticate(user=user)

    def test_article_list(self):
        response = self.client.get(
            reverse('article-list'),
            format="json")

        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], "TestTitle")
        self.assertEqual(response.data[0]['text'], "TestText")
