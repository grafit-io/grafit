from django.contrib.auth.models import Group
from rest_framework import serializers

from .models import User, Article


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups', 'first_name', 'last_name')


class CreateUserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        # call create_user on user object. Without this
        # the password will be stored in plain text.
        user = User.objects.create_user(**validated_data)
        return user

    class Meta:
        model = User
        fields = ('url', 'username', 'password', 'first_name', 'last_name', 'email',)
        extra_kwargs = {'password': {'write_only': True}}


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class SubArticleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Article
        fields = ('url', 'id', 'title')


class ArticleSerializer(serializers.HyperlinkedModelSerializer):
    related = SubArticleSerializer(required=False, many=True)

    class Meta:
        model = Article
        fields = ('id', 'url', 'title', 'text', 'related', 'created_at', 'updated_at')
