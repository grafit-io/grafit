from rest_framework.test import force_authenticate, APITestCase, APIClient
from django.urls import reverse

from ..models import Workspace, User


class WorkspaceTest(APITestCase):
    def setUp(self):
        self.test_user = User.objects.create_user(
            'testuser', 'test@example.com', 'testpassword')

        workspace = Workspace(name="Testworkspace",
                              initials="TE")
        workspace.save()
        workspace.users.add(User.objects.get(username='testuser'))

        Workspace.objects.create(name="fail",
                                 initials="FA")

    def test_workspace_get(self):
        """
        Create two workspaces. Add one to the testuser. Check if only one of the is returnd.
        """

        self.client = APIClient()
        user = User.objects.get(username='testuser')
        self.client.force_authenticate(user=user)
        self.response = self.client.get(
            reverse('workspace-list'),
            format="json")

        self.assertEqual(len(self.response.data), 1)
        self.assertEqual(self.response.data[0]['initials'], 'TE')
