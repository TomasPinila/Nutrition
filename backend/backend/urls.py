from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView # prebuilt views that allow us to obtain access and refresh tokens and to refresh the token

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"), #  takes your CreateUserView class and turns it into a view function that can handle HTTP requests. When a request is made to /api/user/register, Django calls the function returned by as_view(), which then creates an instance of CreateUserView and dispatches the request to the appropriate method (like post() or get()).
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")), #  Adds login/logout for Django REST's browsable API, and link all prebuilt URLs we need from REST framework
    path("api/", include("api.urls")),
]
