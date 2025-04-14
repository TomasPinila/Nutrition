from django.shortcuts import render
from .models import User, Diet, Intolerance
from rest_framework import generics, status # Import generic views for common CRUD operations
from rest_framework.views import APIView
from .serializers import UserSerializer, DietSerializer, IntoleranceSerializer, ProductSearchSerializer
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response

from .api import fetch_api_data
from .nutrition import healthEvaluation

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
class UserSavedRecipes(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        #TODO: Retrieve basic info about recipes from API
        user = request.user
        # return user.saved_recipes.all() Previously, when you had a ManyToManyField, calling user.saved_recipes.all() returned a queryset of related Recipe objects.
        return Response(user.saved_recipes) # Now, after switching to an ArrayField that stores a list of integers, user.saved_recipes is simply a Python list, and it doesn't have an .all() method. Therefore, returning Response(user.saved_recipes) directly sends the list of recipe IDs as JSON.


"""""
    View for listing all user's liked recipes
"""""
class UserLikedRecipes(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        #TODO: Retrieve basic info about recipes from API
        user = request.user
        return Response(user.liked_recipes) 



"""""
    View for listing a specific intolerance, adding and destroying a particular one from user, listing is only for learning purposes, we won't use it irl
"""""
class IntoleranceDetail(generics.RetrieveUpdateDestroyAPIView): 
    queryset = Intolerance.objects.all()
    serializer_class = IntoleranceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly] # will ensure that authenticated requests get read-write access, and unauthenticated requests get read-only access.
    # We don't need the IsAuthenticatedOrReadOnly, or even the Retrieve, because this is a functionality only for signed in users, but we're learning so who cares, useful for checking rest api tho

    def update(self, request, *args, **kwargs):
        user = self.request.user
        # Expecting the request data to include the new diet id in body
        new_intolerance_id = request.data.get('intolerance_id') 

        if not new_intolerance_id:
            return Response({"error": "Intolerance ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch the new diet based on the intolerance_id from the request
        try:
            new_intolerance = Intolerance.objects.get(id=new_intolerance_id)
        except Intolerance.DoesNotExist:
            raise NotFound(detail="Intolerance not found.")
        
        # Check if the intolerance already in user's intolerance
        if new_intolerance in user.intolerances.all():
            return Response(
                {"error": "Provided intolerance is already assigned intolerance."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Associate the new diet with the user
        user.intolerances.add(new_intolerance)
        user.save()  # Save the user with the new intolerance

        # Return the updated diet data
        serializer = self.get_serializer(user.intolerances)
        return Response(serializer.data)
    

    def destroy(self, request, *args, **kwargs):

        """
        *args allows a function to accept any number of positional arguments as a tuple. In the context of Django REST Framework's generic views, this ensures that if the framework or a parent class passes extra positional arguments, your method can handle them without error.
        **kwargs collects any additional keyword arguments (i.e., arguments passed as name=value pairs) into a dictionary. This is useful when the view or framework passes extra named parameters that you might not have explicitly defined. This also helps maintain compatibility with the method signature expected by the parent class, ensuring that any extra data (for example, URL parameters captured by the router) is accepted.
        """

        user = self.request.user
        # Expecting the request data to include the new diet id in body
        new_intolerance_id = request.data.get('intolerance_id') 

        if not new_intolerance_id:
            return Response({"error": "Intolerance ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch the new diet based on the intolerance_id from the request
        try:
            intolerance = Intolerance.objects.get(id=new_intolerance_id)
        except Intolerance.DoesNotExist:
            raise NotFound(detail="Intolerance not found.") 
        
        # Check if the diet id provided matches the user's current intolerance
        if intolerance not in user.intolerances.all():
            return Response(
                {"error": "Provided intolerance does not match user's assigned intolerance."},
                status=status.HTTP_400_BAD_REQUEST
            )
    
        # Instead of deleting the instance from the database, remove it from the user's intolerances:
        user.intolerances.remove(intolerance) # Return a response with HTTP 204 No Content status to indicate successful removal.
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
        new_diet_id = request.data.get('diet_id') 

        # If the user doesn't have a diet, or has one but wants to change it, create one using the id sent
        if not new_diet_id:
            return Response({"error": "Diet ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch the new diet based on the diet_id from the request
        try:
            new_diet = Diet.objects.get(id=new_diet_id)
        except Diet.DoesNotExist:
            raise NotFound(detail="Diet not found.")

        # Associate the new diet with the user
        user.diet = new_diet
        user.save()  # Save the user with the new diet

        # Return the updated diet data
        serializer = self.get_serializer(user.diet)
        return Response(serializer.data)
    
    def delete(self, request, *args, **kwargs):
        user = self.request.user
        
        # Remove the diet association from the user by setting it to None, method is used for many-to-many relationships, not for a ForeignKey
        user.diet = None
        user.save()
        
        # Return a response indicating success; 204 No Content is often used for DELETE.
        return Response({"message": "Diet removed from user."}, status=status.HTTP_204_NO_CONTENT)
    

"""""
    View for adding or removing a specific saved recipe ID. 
    Since the recipes are now stored as simple lists of integers rather than as related model instances with a QuerySet interface, we can’t rely on generic views (like ListAPIView or RetrieveUpdateDestroyAPIView) which are designed to work with QuerySets. 
    The APIView gives you the flexibility to manually handle the logic (e.g., GET, POST, DELETE) without expecting a queryset.
"""""
class UserSavedRecipeDetail(APIView): 
    permission_classes = [IsAuthenticated]

   # To add a recipe id to the user's saved_recipes
    def post(self, request, recipe_id):
        user = request.user
        if recipe_id in user.saved_recipes:
            return Response(
                {"error": "Recipe already saved."},
                status=status.HTTP_400_BAD_REQUEST
            )
        user.saved_recipes.append(recipe_id)
        user.save()
        return Response(user.saved_recipes, status=status.HTTP_201_CREATED)

    # To remove a recipe id from the user's saved_recipes
    def delete(self, request, recipe_id):
        user = request.user
        if recipe_id not in user.saved_recipes:
            return Response(
                {"error": "Recipe not found in saved recipes."},
                status=status.HTTP_404_NOT_FOUND
            )
        user.saved_recipes.remove(recipe_id)
        user.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

"""""
    View for adding or removing a specific liked recipe ID
"""""
class UserLikedRecipeDetail(APIView):
    permission_classes = [IsAuthenticated]

    # To add a recipe id to the user's liked_recipes
    def post(self, request, recipe_id):
        user = request.user
        if recipe_id in user.liked_recipes:
            return Response(
                {"error": "Recipe already liked."},
                status=status.HTTP_400_BAD_REQUEST
            )
        user.liked_recipes.append(recipe_id)
        user.save()
        return Response(user.liked_recipes, status=status.HTTP_201_CREATED)

    # To remove a recipe id from the user's liked_recipes
    def delete(self, request, recipe_id):
        user = request.user
        if recipe_id not in user.liked_recipes:
            return Response(
                {"error": "Recipe not found in liked recipes."},
                status=status.HTTP_404_NOT_FOUND
            )
        user.liked_recipes.remove(recipe_id)
        user.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

"""
    View for searching up products, calls FDC API
"""
class ProductSearchView(APIView):
    """
    API endpoint that proxies product search queries to the FDC API, also calls function to calculate health score and returns it.
    Accessible to all users (even non-registered).
    """
    permission_classes= [AllowAny]

    def get(self, request):
        # Extract query parameters from the request
        search_query = request.query_params.get('query') # Retrieve query parameter
        if not search_query:
            return Response(
                {"error": "Search query parameter is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            page_number = int(request.query_params.get('page_number', 1))
        except ValueError:
            return Response(
                {"error": "Invalid page number format"},
                status=status.HTTP_400_BAD_REQUEST
            )

        path = "/v1/foods/search"
        api_name = "fdc"

        params = {
            'query': search_query,
            'pageSize': 10, # Size of page always 10
            'pageNumber': page_number, 
            'dataType': 'Branded', # We're looking for branded products
        }
        
        # API Call
        response_data = fetch_api_data(path, api_name, params)
        if "error" in response_data:
            return Response(response_data, status=status.HTTP_502_BAD_GATEWAY)
        
        current_page = response_data.get("currentPage")
        if current_page > 1:
            current_set_page = int((int(current_page) - 1)/5)
        elif current_page == 1:
            current_set_page = 0
        else:
            return Response(
                {"error": "Invalid page number format"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        total_pages = response_data.get("totalPages")
        products = response_data.get("foods")
        processed_products = []
        product_id = 0

        for product in products:
            # add basic product info
            # USDA calculates values per 100g or 100ml from values per serving
            product_information = {
                "id": product_id,
                "title": product.get("description"),
                "brandOwner": product.get("brandOwner"),
                "brandName": product.get("brandName"),
                "ingredients": product.get("ingredients"),
                "marketCountry": product.get("marketCountry"),
                "category": product.get("foodCategory"),
            }
            product_id += 1

            product_nutrients = []

            # Go through every nutrient and add needed info
            for nutrient in product.get("foodNutrients"):
                if nutrient.get("unitName") == "KCAL":
                    calorie_number = nutrient.get("value")
                else:
                    # Add basic nutrient info
                    n = {
                        "nutrientId": nutrient.get("nutrientId"),
                        "nutrientName": nutrient.get("nutrientName")
                    }
                    # Convert all units to grams
                    if nutrient.get("unitName") == "G": # grams
                        n["grams_amount"] = nutrient.get("value")
                    elif nutrient.get("unitName") == "MG": # miligrams
                        n["grams_amount"] = nutrient.get("value")/1000
                    elif nutrient.get("unitName") == "UG": # micrograms
                        n["grams_amount"] = nutrient.get("value")/1000000
                    else:
                        n["grams_amount"] = 'NA'
                    
                    if nutrient.get("percentDailyValue"):
                        n["percentDailyValue"] = nutrient.get("percentDailyValue")
                      
                    # add to product_nutrients dictionary
                    product_nutrients.append(n)
            
            # add calories to product_information
            product_information["calories"] = calorie_number

            health_evaluation = healthEvaluation(calorie_number, product_nutrients, product_information["ingredients"])

            product_information["health_evaluation"] = health_evaluation

            processed_products.append(product_information)

        processed_data = {
            "current_page": current_page,
            "current_set_page": current_set_page,
            "total_pages": total_pages,
            "page_size": 10,
            "products": processed_products
        }    

        serializer = ProductSearchSerializer(processed_data)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
        
'''
class ProductInformationView(APIView):
    """
    API endpoint that proxies specific product search query to FDC's API.
    Accessible to all users (even non-registered).
    """
    permission_classes= [AllowAny]

    def get(self, request, product_id):       
        path = f"/food/products/{product_id}"
        
        response_data = fetch_api_data(path)
        if "error" in response_data:
            return Response(response_data, status=status.HTTP_502_BAD_GATEWAY)
        
        nutrition = response_data["nutrition"]
        nutrients = nutrition["nutrients"]
        nrf_score = nutritionevaluation(nutrients)

        # Prepare data with the required fields
        product_data = {
            "id": response_data.get("id"),
            "title": response_data.get("title"),
            "image": response_data.get("image"),
            "category": response_data.get("category"),
            "price": response_data.get("price"),
            "nrf_score": nrf_score
        }

        serializer = ProductSerializer(product_data)
        
        return Response(serializer.data, status=status.HTTP_200_OK)'
'''