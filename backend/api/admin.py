from django.contrib import admin
from .models import User, Intolerance, Diet
# Register your models here.

class DietDisplay(admin.ModelAdmin):
    list_display = ("name", "description", "id")

class IntoleranceDisplay(admin.ModelAdmin):
    list_display = ("name", "id")

admin.site.register(User)
admin.site.register(Intolerance, IntoleranceDisplay)
admin.site.register(Diet, DietDisplay)