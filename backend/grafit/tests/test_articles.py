from rest_framework.test import force_authenticate, APITestCase, APIClient
from django.urls import reverse
from rest_framework import status

from ..models import Article, Workspace, User


class ArticleTest(APITestCase):
    def setUp(self):
        test_user = User.objects.create_user('testuser', 'test@example.com', 'testpassword')
        workspace = Workspace(name="Testworkspace", initials="TE")
        workspace.save()
        workspace.users.add(test_user)

        Article.objects.create(title="TestTitle", text="TestText", workspace=workspace)

        self.client = APIClient()
        self.user = User.objects.get(username='testuser')
        self.client.force_authenticate(user=self.user)

    def test_article_list(self):
        response = self.client.get(
            reverse('article-list'),
            format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), Article.objects.filter(workspace__users=self.user).count())
        self.assertEqual(response.data[0]['title'], "TestTitle")
        self.assertEqual(response.data[0]['text'], "TestText")

    def test_article_list_workspace_permission(self):
        other_user = User.objects.create_user('test2', 'test2@example.com', 'testpassword')
        other_workspace = Workspace(name="Testworkspace", initials="TE")
        other_workspace.save()
        other_workspace.users.add(other_user)

        Article.objects.create(title="TestTitle2", text="TestText2", workspace=other_workspace)

        response = self.client.get(
            reverse('article-list'),
            format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), Article.objects.filter(workspace__users=self.user).count())

    def test_article_create(self):
        url = reverse('article-list')
        data = {
            'title': 'New Article Title',
            'text': 'Test test test test',
            'workspace': Workspace.objects.get(name="Testworkspace").id
        }
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Article.objects.get(title='New Article Title').title, 'New Article Title')
        self.assertEqual(Article.objects.get(title='New Article Title').text, 'Test test test test')

    def test_article_create_notext(self):
        numberOfArticles = Article.objects.all().count()

        url = reverse('article-list')
        data = {
            'title': 'New Article Title',
            'workspace': Workspace.objects.get(name="Testworkspace").id
        }
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Article.objects.count(), numberOfArticles + 1)
        self.assertEqual(Article.objects.get(title="New Article Title").title, 'New Article Title')

    def test_update_article(self):
        numberOfArticles = Article.objects.all().count()
        testArticleId = Article.objects.get(title="TestTitle").id

        data = {
            'title': 'Test123',
            'text': '',
            'workspace': Workspace.objects.get(name="Testworkspace").id
        }
        response = self.client.put(reverse('article-detail', args=[testArticleId]), data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Article.objects.count(), numberOfArticles)
        self.assertEqual(Article.objects.get(pk=testArticleId).title, 'Test123')
        self.assertEqual(Article.objects.get(pk=testArticleId).text, '')

    def test_article_delete(self):
        numberOfArticles = Article.objects.all().count()
        articleId = Article.objects.get(title="TestTitle").id
        response = self.client.delete(reverse('article-detail', args=[articleId]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Article.objects.all().count(), numberOfArticles - 1)
