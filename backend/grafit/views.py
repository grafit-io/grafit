import time
from django.contrib.auth.models import Group
from .serializers import UserSerializer, GroupSerializer, CreateUserSerializer, ArticleSerializer, WorkspaceSerializer
from rest_framework import viewsets, mixins, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .concept_runner import ConceptRunner
from .models import User, Article, Workspace, GraphArticle, SearchResult
import logging


logger = logging.getLogger()
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())


class UserViewSet(mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class UserCreateViewSet(mixins.CreateModelMixin,
                        viewsets.GenericViewSet):
    """
    Creates user accounts
    """
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = (AllowAny,)


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer

    def get_queryset(self):
        user = self.request.user
        return Article.objects.filter(workspace__users=user).order_by('-updated_at')


class WorkspaceViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin,
                       viewsets.GenericViewSet):
    serializer_class = WorkspaceSerializer

    def get_queryset(self):
        """
        This view should return a list of all the workspaces
        for the currently authenticated user.
        """
        user = self.request.user
        return Workspace.objects.filter(users=user)


class GraphAPI(APIView):
    def get(self, request, format=None):
        ts = int(round(time.time()))
        GraphArticle(uid=ts, name='test').save()
        response = []

        for node in GraphArticle.nodes:
            response.append((node.uid, node.name))

        return Response(response)


class SearchAPI(APIView):
    def get(self, request, format=None):
        searchTerm = request.query_params.get('searchTerm')
        results = SearchResult.objects.raw('''
            SELECT id, title, ts_rank(document, to_tsquery('english', %s)) as rank
            FROM grafit_search_index
            WHERE document @@ to_tsquery('english', %s)
            ORDER BY rank DESC ''', [searchTerm, searchTerm])

        response = []

        for node in results:
            response.append((node.id, node.title, node.rank))

        return Response(response)


class ConceptRunnerAPI(APIView):
    def get(self, request, format=None):
        articleId = request.query_params.get('id')
        try:
            if articleId:
                ConceptRunner.generate_concepts_for_article(int(articleId))
            else:
                ConceptRunner.generate_graph()
            return Response(status.HTTP_200_OK)
        except:
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)
