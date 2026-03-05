import logging

from django.db import DatabaseError
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer, UserSerializer

logger = logging.getLogger(__name__)


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except DatabaseError as exc:
            logger.exception('Register failed due to database error: %s', exc)
            return Response(
                {'detail': 'Registration service temporarily unavailable. Please try again shortly.'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )


class SafeTokenObtainPairView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            return super().post(request, *args, **kwargs)
        except DatabaseError as exc:
            logger.exception('Token issue failed due to database error: %s', exc)
            return Response(
                {'detail': 'Login service temporarily unavailable. Please try again shortly.'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )


class MeView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        return Response(UserSerializer(request.user).data)
