# Generated by Django 5.1.6 on 2025-03-04 01:11

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_remove_diet_diet_id_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='saved_recipes',
        ),
        migrations.RemoveField(
            model_name='user',
            name='liked_recipes',
        ),
        migrations.AddField(
            model_name='user',
            name='saved_recipes',
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.DeleteModel(
            name='Recipe',
        ),
        migrations.AddField(
            model_name='user',
            name='liked_recipes',
            field=models.JSONField(blank=True, default=list),
        ),
    ]
