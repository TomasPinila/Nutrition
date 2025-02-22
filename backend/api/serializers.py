from rest_framework import serializers
from .models import User, Recipe, Diet, Intolerance

class UserSerializer(serializers.ModelSerializer): # inherits from serializers.ModelSerializer, ModelSerializer: Automatically generates fields based on the Django model.

    """
    Even though the model defines the relationships, the serializer is responsible for the API interface. Explicitly specifying them gives you finer control over data handling and presentation.

    Handles user data serialization/deserialization.
    Special handling for relationships (M2M(ManyToMany) and ForeignKey) is needed because:
    - User can have multiple intolerances (M2M)
    - User can have one diet (ForeignKey)
    - User can save/like multiple recipes (M2M)
    """

    # M2M relationships need explicit declaration in DRF for write operations
    intolerances = serializers.PrimaryKeyRelatedField(
        many=True,                          # Because it's a ManyToMany relationship
        queryset=Intolerance.objects.all(), # Defines all possible Intolerance objects that can be assigned. This is necessary so that DRF knows how to validate incoming IDs (i.e., each ID must exist in this queryset).
        allow_null=True,                    # Allows the field to be null (i.e., a user may have no intolerances).
        required=False                      # The field is optional during creation or update.
    )
    diet = serializers.PrimaryKeyRelatedField( # Since the diet is a ForeignKey (one-to-one relationship per user), we do not set many=True.
        queryset=Diet.objects.all(),
        allow_null=True,
        required=False 
    )
    saved_recipes = serializers.PrimaryKeyRelatedField(
        many=True, 
        queryset=Recipe.objects.all(),
        allow_null=True,
        required=False
    )
    liked_recipes = serializers.PrimaryKeyRelatedField(
        many=True, 
        queryset=Recipe.objects.all(),
        allow_null=True,
        required=False
    )
    
    # In Django REST Framework (DRF), the Meta class is a convention used to configure the serializer's behavior without explicitly declaring every field.
    class Meta:# fields we'd like to serialize and return when we use the serializer
        # Serializer will look at this model and all and all its fields, make sure they're valid, and then pass the data to the create() function
        model = User
        fields = ["id", "username", "password", "saved_recipes", "liked_recipes", "intolerances", "diet"] # fields to serialize when accepting/returning a new user
        extra_kwargs = {"password": {"write_only": True}} # tells django we want to accept a password when we're creating a new user but not return password when giving info about a user



    """
    FIXED ERROR, our user serializer has more than username and password fields, so for creation only set up those
    """
    # Implementing method that will be called when we want to create a new version of this user,  create method so it only processes username and password
    def create(self, validated_data): # accept validated data that has already passed all checks the serializer does for us, looking for valid username and password
        password = validated_data.pop("password", None) # Extract password
        user = User(username=validated_data["username"]) # Create user instance with only username

        if password:
            user.set_password(password)  # Hash password properly

        user.save()  # Save user to database
        return user
       
class DietSerializer(serializers.ModelSerializer):

    class Meta:
        model = Diet
        fields = ["id", "name", "description"]
        extra_kwargs = {"name": {"read_only":True}, 
                        "description":{"read_only":True}}


class IntoleranceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Intolerance
        fields = ["id", "name"]
        extra_kwargs = {"name": {"read_only":True}}


class RecipeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recipe
        fields = ["id", "recipe_id"]