from django.test import TestCase
from rest_framework.test import force_authenticate, APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
from grafit.search.search import Search
from grafit.models import Article, Workspace, User


class SearchTest(TestCase):
    def test_cleanSearchTerm_spaceToOr(self):
        testTerm = "word1 word2"
        expectedResult = "word1|word2"
        assert Search.cleanSearchTerm(testTerm) == expectedResult

    def test_cleanSearchTerm_removeAnd(self):
        testTerm = "word1&word2"
        expectedResult = "word1|word2"
        assert Search.cleanSearchTerm(testTerm) == expectedResult

    def test_cleanSearchTerm_removeExcamation(self):
        testTerm = "word1&word2"
        expectedResult = "word1|word2"
        assert Search.cleanSearchTerm(testTerm) == expectedResult

    def test_cleanSearchTerm_removeMultispace(self):
        testTerm = "   word1    word2 "
        expectedResult = "word1|word2"
        assert Search.cleanSearchTerm(testTerm) == expectedResult


class SearchAPITest(APITestCase):
    def setUp(self):
        test_user = User.objects.create_user('testuser', 'test@example.com', 'testpassword')
        workspace = Workspace(name="Testworkspace", initials="TE")
        workspace.save()
        workspace.users.add(test_user)

        for i in range(0, 50):
            Article.objects.create(title="TestTitle", text="TestText", workspace=workspace)

        self.client = APIClient()
        self.user = User.objects.get(username='testuser')
        self.client.force_authenticate(user=self.user)

    def test_search_limit(self):
        response = self.client.get(
            reverse('search-list'), {'searchTerm': 'TestTitle'},
            format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), min(Article.objects.filter(workspace__users=self.user).count(), 25))
