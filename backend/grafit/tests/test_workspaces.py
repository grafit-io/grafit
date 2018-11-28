from rest_framework.test import force_authenticate, APITestCase, APIClient
from django.urls import reverse
from rest_framework import status

from ..models import Workspace, User


class WorkspaceTest(APITestCase):
    def setUp(self):
        testWorkspace = Workspace(name="Testworkspace",
                                  initials="TE")
        testWorkspace.save()

        User.objects.create_user(
            'testuser', 'test@example.com', 'testpassword')

        testWorkspace.users.add(User.objects.get(username='testuser'))
        Workspace.objects.create(name="fail",
                                 initials="FA")

        self.client = APIClient()
        self.user = User.objects.get(username='testuser')
        self.client.force_authenticate(user=self.user)

    def test_workspace_get(self):
        """
        Create two workspaces. Add one to the testuser. Check if only one of them is returned.
        """

        response = self.client.get(
            reverse('workspace-list'),
            format="json")

        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['initials'], 'TE')

    def test_workspace_create(self):

        numberOfWorkspaces = Workspace.objects.all().count()

        data = {
            "name": "Test Workspace",
            "initials": "TW"
        }

        response = self.client.post(
            reverse('workspace-list'), data, format="json")

        self.assertEqual(Workspace.objects.count(), numberOfWorkspaces + 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_workspace_create_noinitials(self):
        data = {
            "name": "Test Workspace",
            "initials": ""
        }

        response = self.client.post(
            reverse('workspace-list'), data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_workspace_create_notitle(self):
        data = {
            "name": "",
            "initials": "TW"
        }

        response = self.client.post(
            reverse('workspace-list'), data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_workspace_create_autoasign(self):

        originalWorkspaceCount = len(self.client.get(
            reverse('workspace-list'),
            format="json").data)

        data = {
            "name": "Test Workspace",
            "initials": "TW"
        }

        response = self.client.post(
            reverse('workspace-list'), data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        newWorkspaceCount = len(self.client.get(
            reverse('workspace-list'),
            format="json").data)

        self.assertEqual(newWorkspaceCount, originalWorkspaceCount + 1)
