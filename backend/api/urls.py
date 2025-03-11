from django.urls import path
from . import views

# By default, Django’s APPEND_SLASH setting (and middleware) expects your URL patterns to end with a slash.
urlpatterns = [ # URL patterns define the structure of the URL path. Query parameters are appended to the URL and parsed by Django automatically. You don’t need to specify them in your urlpatterns.
    # List
    path("list_user_intolerances/", views.UserIntolerances.as_view(), name="user-intolerances-list"),
    path("list_intolerances/", views.Intolerances.as_view(), name="intolerances-list"),
    path("list_diets/", views.Diets.as_view(), name="diets-list"),
    path("list_saved_recipes/", views.UserSavedRecipes.as_view(), name="saved-recipes-list"),
    path("list_liked_recipes/", views.UserLikedRecipes.as_view(), name="liked-recipes-list"),

    # Show/Update/Delete/Add specific, for ex add a new intolerance to user or modify his diet
    # path("intolerance/<int:pk>/", views.IntoleranceDetail.as_view(), name="intolerance"), # by default DRF’s generic views expect a parameter named pk
    # sending intolerance id through body instead, its good practice, look at questions that arose in notion project page
    path("intolerance/", views.IntoleranceDetail.as_view(), name="intolerance"),
    path("user_diet/", views.UserDiet.as_view(), name="user_diet"),
    path("saved_recipe/<int:recipe_id>/", views.UserSavedRecipeDetail.as_view(), name="saved_recipe"),
    path("liked_recipe/<int:recipe_id>/", views.UserLikedRecipeDetail.as_view(), name="liked_recipe"),
    
    #Calling Spoonacular API
    path("product_search/", views.ProductSearchView.as_view(), name="product_search"), # URL patterns only match the path portion of the URL—not the query parameters. Query parameters (everything after the “?”) are handled within your view via request.query_params
    path("product/<int:product_id>", views.ProductInformationView.as_view(), name="specific_product"), 
]