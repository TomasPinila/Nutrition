from django.shortcuts import render
from .models import User, Recipe, Diet, Intolerance
from rest_framework import generics, status # Import generic views for common CRUD operations
from .serializers import UserSerializer, DietSerializer, RecipeSerializer, IntoleranceSerializer
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response

# Django Rest framework provides default views for creating, updating, deleting, etc, and doing the standard operations that you'd do with a rest API
# TODO: Either start testing and configuring everything from spoonacular API or start with Frontend, or even REST tutorial 

# Serializer for user creation
class CreateUserView(generics.CreateAPIView): # Generic view built into Django that will automatically handle creating a new User/Object for us
                                              # 'CreateAPIView' Used for create-only endpoints. responds to POST requests.
    queryset = User.objects.all() # Specifies the database query to get User objects
    serializer_class = UserSerializer # tells view what kind of data we need to accept to create a new user
    permission_classes = [AllowAny] # Who can call this? Anyone, not authenticated too to create new user


"""""
    View for listing all Intolerances a user has and for adding a new one
"""""
class UserIntolerances(generics.ListCreateAPIView): # Works also for adding intolerances
    serializer_class = IntoleranceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return user.intolerances.all()

    def perform_create(self, serializer):
        user = self.request.user
        new_intolerance = self.get_object()
        user.intolerances.add(new_intolerance)


"""""
    View for listing all Intolerances 
"""""
class Intolerances(generics.ListAPIView):
    queryset = Intolerance.objects.all() 
    serializer_class = IntoleranceSerializer
    permission_classes = [AllowAny] 


"""""
    View for listing all Diets available
"""""
class Diets(generics.ListAPIView):
    queryset = Diet.objects.all() 
    serializer_class = DietSerializer
    permission_classes = [AllowAny]


"""""
    View for listing all user's saved recipes
"""""
class UserSavedRecipes(generics.ListAPIView):
    serializer_class = Recipe
    permission_classes = [IsAuthenticated]

    def queryset(self):
        #TODO: Retrieve basic info about recipes from API
        user = self.request.user
        return user.saved_recipes.all()


"""""
    View for listing all user's liked recipes
"""""
class UserLikedRecipes(generics.ListAPIView):
    serializer_class = Recipe
    permission_classes = [IsAuthenticated]

    def queryset(self):
        #TODO: Retrieve basic info about recipes from API
        user = self.request.user
        return user.liked_recipes.all()



"""""
    View for listing a specific intolerance and destroying a particular one
"""""
class IntoleranceDetail(generics.RetrieveDestroyAPIView): # Works also for adding intolerances
    queryset = Intolerance.objects.all()
    serializer_class = IntoleranceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly] # will ensure that authenticated requests get read-write access, and unauthenticated requests get read-only access.
    # We don't need the IsAuthenticatedOrReadOnly, or even the Retrieve, because this is a functionality only for signed in users, but we're learning so who cares, useful for checking rest api tho

    def destroy(self, request, *args, **kwargs):

        """
        *args allows a function to accept any number of positional arguments as a tuple. In the context of Django REST Framework's generic views, this ensures that if the framework or a parent class passes extra positional arguments, your method can handle them without error.
        **kwargs collects any additional keyword arguments (i.e., arguments passed as name=value pairs) into a dictionary. This is useful when the view or framework passes extra named parameters that you might not have explicitly defined. This also helps maintain compatibility with the method signature expected by the parent class, ensuring that any extra data (for example, URL parameters captured by the router) is accepted.
        """

        user = self.request.user
        intolerance = self.get_object() # .get_object() you avoid having to manually fetch the ID from the request data, and you ensure the lookup uses the URL parameter. already returns the Intolerance instance (or raises a 404 if not found). 
        
        # Check if the diet id provided matches the user's current intolerance
        if intolerance not in user.intolerances.all():
            return Response(
                {"error": "Provided intolerance does not match user's assigned intolerance."},
                status=status.HTTP_400_BAD_REQUEST
            )
    
        # Instead of deleting the instance from the database, remove it from the user's intolerances:
        self.request.user.intolerances.remove(intolerance) # Return a response with HTTP 204 No Content status to indicate successful removal.
        return Response(status=status.HTTP_204_NO_CONTENT)


"""""
    View for showing specific Diet, updating it (if not currently one adding one, or changing one into another one), and deleting it
"""""
class UserDiet(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DietSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self): # get_object because its only one Diet
        user = self.request.user
        return user.diet
    
    def update(self, request, *args, **kwargs):
        user = self.request.user
        # Expecting the request data to include the new diet id in url
        diet = self.get_object() 

        # If the user doesn't have a diet, or has one but wants to change it, create one using the id sent
        # Associate the found Diet with the user (switching diets or setting one for the first time).
        user.diet = diet
        user.save()  # Make sure to call save() to persist the change.
        
        # Return the updated diet data.
        serializer = self.get_serializer(user.diet)
        return Response(serializer.data)
    
    def delete(self, request, *args, **kwargs):
        user = self.request.user
        # Expecting the request data to include the new diet id, e.g., {"id": 3}
        diet = self.get_object() 

        # Check if the diet id provided matches the user's current diet
        if user.diet.id != diet.id:
            return Response(
                {"error": "Provided diet id does not match user's assigned diet."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        
        # Remove the diet association from the user by setting it to None, method is used for many-to-many relationships, not for a ForeignKey
        user.diet = None
        user.save()
        
        # Return a response indicating success; 204 No Content is often used for DELETE.
        return Response({"message": "Diet removed from user."}, status=status.HTTP_204_NO_CONTENT)
    

"""""
    View for listing a specific saved recipe and destroying a particular one
"""""
class UserSavedRecipeDetail(generics.RetrieveDestroyAPIView): # Works also for adding intolerances
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        #TODO: make API call to retrieve recipe and its details, with a function ofc, create it man
        user = self.request.user
        return user.saved_recipes.all()
    
    def destroy(self, request, *args, **kwargs):

        user = self.request.user
        recipe = self.get_object()

        # Instead of deleting the instance from the database, remove it from the user's intolerances:
        self.request.user.saved_recipes.remove(recipe) # Return a response with HTTP 204 No Content status to indicate successful removal.
        return Response(status=status.HTTP_204_NO_CONTENT)


"""""
    View for listing a specific liked recipe and destroying a particular one
"""""
class UserLikedRecipeDetail(generics.RetrieveDestroyAPIView): # Works also for adding intolerances
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        #TODO: make API call to retrieve recipe and its details, with a function ofc, create it man
        user = self.request.user
        return user.liked_recipes.all()
    
    def destroy(self, request, *args, **kwargs):
        user = self.request.user
        recipe = self.get_object()
    
        # Instead of deleting the instance from the database, remove it from the user's intolerances:
        self.request.user.liked_recipes.remove(recipe) # Return a response with HTTP 204 No Content status to indicate successful removal.
        return Response(status=status.HTTP_204_NO_CONTENT)