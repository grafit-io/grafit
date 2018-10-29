from django.contrib.auth.models import Group
from .models import User, Article
from .concept_runner import ConceptRunner
from rest_framework import viewsets, mixins
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from grafit.serializers import UserSerializer, GroupSerializer, CreateUserSerializer, ArticleSerializer


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
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class ConceptRunnerAPI(APIView):
    def get(self, request, format=None):
        runner = ConceptRunner()
        response = runner.generate_graph()
        return Response(response)
        