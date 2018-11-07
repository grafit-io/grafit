from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Article


@admin.register(User)
class UserAdmin(UserAdmin):
    pass


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('id', 'title',)
    ordering = ('id',)
    pass
