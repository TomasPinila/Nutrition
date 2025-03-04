from django.contrib.auth.models import AbstractUser
from django.db import models


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
    saved_recipes = models.JSONField(default=list, blank=True) # It can store lists of integers (or other JSON-serializable objects) and is a good alternative when you don't need PostgreSQL’s ArrayField.
    liked_recipes = models.JSONField(default=list, blank=True)
    intolerances = models.ManyToManyField(Intolerance, blank=True)
    diet = models.ForeignKey(Diet, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.username