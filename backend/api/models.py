from django.contrib.auth.models import AbstractUser
from django.db import models


class Recipe(models.Model):
    recipe_id = models.IntegerField(null=False) 

    def __str__(self):
        return f"Recipe {self.recipe_id}"

class Intolerance(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Diet(models.Model):
    name = models.CharField(max_length=100, unique=True)  
    description = models.TextField(null=True) 

    def __str__(self):
        return self.name
    
# Create your models here.
class User(AbstractUser):
    saved_recipes = models.ManyToManyField(Recipe, blank=True, related_name="users_saved")
    liked_recipes = models.ManyToManyField(Recipe, blank=True, related_name="users_liked")
    intolerances = models.ManyToManyField(Intolerance, blank=True)
    diet = models.ForeignKey(Diet, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.username