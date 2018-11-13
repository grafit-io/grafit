import uuid
from datetime import datetime

from django.contrib.auth.models import AbstractUser
from django.db import models
from neomodel import StructuredNode, StringProperty, UniqueIdProperty, Relationship, StructuredRel, FloatProperty, DateTimeProperty


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    def __str__(self):
        return self.username


class Article(models.Model):
    title = models.CharField(max_length=250)
    text = models.TextField(blank=True)
    related = models.ManyToManyField("self", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return '{"title": %s, "title" %s}' % (self.id, self.title)


class Workspace(models.Model):
    name = models.CharField(max_length=250)
    initials = models.CharField(max_length=2)
    users = models.ManyToManyField(User)


class ArticleRel(StructuredRel):
    created_at = DateTimeProperty(
        default=lambda: datetime.now()
    )
    tf_idf = FloatProperty()


class GraphArticle(StructuredNode):
    uid = UniqueIdProperty()
    name = StringProperty()
    related = Relationship('GraphArticle', 'RELATED', model=ArticleRel)
