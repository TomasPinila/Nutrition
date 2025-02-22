from django.urls import path
from . import views

# By default, Django’s APPEND_SLASH setting (and middleware) expects your URL patterns to end with a slash.
urlpatterns = [
    # List
    path("list_user_intolerances/", views.UserIntolerances.as_view(), name="user-intolerances-list"),
    path("list_intolerances/", views.Intolerances.as_view(), name="intolerances-list"),
    path("list_diets/", views.Diets.as_view(), name="diets-list"),
    path("list_saved_recipes/", views.UserSavedRecipes.as_view(), name="saved-recipes-list"),
    path("list_liked_recipes/", views.UserLikedRecipes.as_view(), name="liked-recipes-list"),

    # Show/Update/Delete specific
    path("intolerance/<int:pk>/", views.IntoleranceDetail.as_view(), name="intolerance"), # by default DRF’s generic views expect a parameter named pk
    path("diet/<int:pk>/", views.UserDiet.as_view(), name="diet"),
    path("saved_recipe/<int:pk>/", views.UserSavedRecipeDetail.as_view(), name="saved_recipe"),
    path("liked_recipe/<int:pk>/", views.UserLikedRecipeDetail.as_view(), name="liked_recipe"),
]