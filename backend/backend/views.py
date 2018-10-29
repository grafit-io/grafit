
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authentication import TokenAuthentication

class TokenViewCustom(ObtainAuthToken):
    authentication_classes = (TokenAuthentication,)
