from django.db import models


# Create your models here.

class Data(models.Model):
    CATEGORY_CHOICES = [('Y', 'Yes'), ('N', 'No')]

    username = models.CharField(max_length=100)
    course = models.CharField(max_length=100)
    isCategory = models.CharField(max_length=1, choices=CATEGORY_CHOICES)
    catNum = models.IntegerField()
    assignNum = models.IntegerField(null=True)
    name = models.CharField(max_length=100, null=True)

    # Following are doubles in the database
    weight = models.CharField(max_length=5, null=True)
    yourScore = models.CharField(max_length=5, null=True)
    totalScore = models.CharField(max_length=5, null=True)
