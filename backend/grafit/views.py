import time
from django.contrib.auth.models import Group
from .serializers import UserSerializer, GroupSerializer, ArticleTitleSerializer, CreateUserSerializer, ArticleSerializer, WorkspaceSerializer, SearchResultSerializer
from rest_framework import viewsets, mixins, status
from rest_framework.permissions import AllowAny
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from .concept_runner import ConceptRunner
from .search.search import Search
from .models import User, Article, Workspace, GraphArticle
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


class ArticleTitleViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    serializer_class = ArticleTitleSerializer

    def get_queryset(self):
        user = self.request.user
        return Article.objects.filter(workspace__users=user)


class ArticleViewSet(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        user = self.request.user
        return Article.objects.filter(workspace__users=user)

    def list(self, request):
        articles = self.filter_queryset(Article.objects.filter(
            workspace__users=request.user).exclude(text__exact="").order_by('-updated_at'))
        page = self.paginate_queryset(articles)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)


class WorkspaceViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.ListModelMixin,
                       viewsets.GenericViewSet):
    serializer_class = WorkspaceSerializer

    def perform_create(self, serializer):
        serializer.save(users=[self.request.user])

    def get_queryset(self):
        """
        This view should return a list of all the workspaces
        for the currently authenticated user.
        """
        user = self.request.user
        return Workspace.objects.filter(users=user)


class SearchResultViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = []

    def list(self, request):
        searchTerm = request.query_params.get('searchTerm', None)

        if not searchTerm:
            return Response([])

        queryset = Search.search(searchTerm)

        serializer = SearchResultSerializer(queryset, many=True)
        return Response(serializer.data)


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


class AddConceptAPI(APIView):
    def post(self, request):
        if "from" in request.data and "to" in request.data:
            fromId = request.data["from"]
            toId = request.data["to"]

            try:
                article_node_from = GraphArticle.nodes.get_or_none(uid=fromId)
                article_node_to = GraphArticle.nodes.get_or_none(uid=toId)

                if not article_node_from or not article_node_to:
                    return Response(status.HTTP_404_NOT_FOUND)
                else:
                    # TODO add by user flag to connection
                    rel = article_node_from.related.relationship(article_node_to)
                    if rel:
                        rel.hidden = False
                        rel.save()
                    else:
                        article_node_from.related.connect(
                            article_node_to, {'tf_idf': 0})
                    return Response(status.HTTP_201_CREATED)

            except:
                return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
            return Response(status.HTTP_404_NOT_FOUND)


class HideConceptAPI(APIView):
    def post(self, request):

        if "from" in request.data and "to" in request.data:
            fromId = request.data["from"]
            toId = request.data["to"]

            try:
                article_node_from = GraphArticle.nodes.get_or_none(uid=fromId)
                article_node_to = GraphArticle.nodes.get_or_none(uid=toId)

                if not article_node_from or not article_node_to:
                    return Response(status.HTTP_404_NOT_FOUND)
                else:
                    rel = article_node_from.related.relationship(article_node_to)
                    rel.hidden = True
                    rel.save()
                    return Response(rel.hidden)

            except:
                return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
            return Response(status.HTTP_404_NOT_FOUND)
