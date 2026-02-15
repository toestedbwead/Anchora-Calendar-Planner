from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

# User Model
class User(AbstractUser):
    pass

# Entry Model

class Entry(models.Model):
    date = models.DateField()
    description = models.CharField(max_length=200)
    reflections = models.CharField(max_length=500, blank=True, null=True)
    mood = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    category = models.CharField(
        max_length = 30,
        choices=[
            ('coding', 'Coding'),
            ('household_chores', 'Household Chores'),
            ('outside_errands', 'Outside Errands'),
            ('hangouts', 'Hangouts'),
            ('gaming', 'Gaming')
        ]
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)  
    created_at = models.DateTimeField(auto_now_add=True) 