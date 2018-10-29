from django.contrib import admin
from django.urls import path, include, re_path, reverse_lazy
from rest_framework import routers
from grafit import views
from django.views.generic.base import RedirectView
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'users', views.UserCreateViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'articles', views.ArticleViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api-token-auth/', obtain_auth_token),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/v1/runner', views.ConceptRunnerAPI.as_view()),

    # the 'api-root' from django rest-frameworks default router
    # http://www.django-rest-framework.org/api-guide/routers/#defaultrouter
    re_path(r'^$', RedirectView.as_view(url=reverse_lazy('api-root'), permanent=False)),
]
