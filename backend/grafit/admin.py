from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, Article, Workspace


@admin.register(User)
class UserAdmin(UserAdmin):
    pass


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'updated_at', 'created_at',)
    ordering = ('updated_at',)
    pass


@admin.register(Workspace)
class WorkspaceAdmin(admin.ModelAdmin):
    pass
