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
        assert Search._Search__cleanSearchTerm(testTerm) == expectedResult

    def test_cleanSearchTerm_removeAnd(self):
        testTerm = "word1&word2"
        expectedResult = "word1|word2"
        assert Search._Search__cleanSearchTerm(testTerm) == expectedResult

    def test_cleanSearchTerm_removeExcamation(self):
        testTerm = "word1&word2"
        expectedResult = "word1|word2"
        assert Search._Search__cleanSearchTerm(testTerm) == expectedResult

    def test_cleanSearchTerm_removeMultispace(self):
        testTerm = "   word1    word2 "
        expectedResult = "word1|word2"
        assert Search._Search__cleanSearchTerm(testTerm) == expectedResult


class SearchAPITest(APITestCase):
    def setUp(self):
        test_user = User.objects.create_user(
            'testuser2', 'test@example.com', 'testpassword')
        self.workspace = Workspace(name="Testworkspace2", initials="TE")
        self.workspace.save()
        self.workspace.users.add(test_user)

        for i in range(0, 50):
            Article.objects.create(
                title="TestTitle", text="TestText", workspace=self.workspace)

        self.client = APIClient()
        self.user = User.objects.get(username='testuser2')
        self.client.force_authenticate(user=self.user)

    def test_search_limit(self):
        response = self.client.get(
            reverse('search-list'), {'searchTerm': 'TestTitle'},
            format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), min(
            Article.objects.filter(workspace__users=self.user).count(), 25))

    def test_search_fuzzy(self):
        testArticle = Article.objects.create(title="Open Source Document Database MongoDB",
                                             text="We're the creators of MongoDB, the most popular database for modern apps, and MongoDB Atlas, the global cloud database on AWS, Azure, and GCP. Easily organize, use, and enrich data — in real time, anywhere.", workspace=self.workspace)

        response = self.client.get(
            reverse('search-list'), {'searchTerm': 'MongoD'},
            format="json")

        results = []

        for respnseObject in response.data:
            results.append(respnseObject['id'])

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn(testArticle.id, results)
