from django.db import models

# Create your models here.


class Posts(models.Model):
    user_id = models.IntegerField(default=0)
    title = models.CharField(max_length=100)
    content = models.TextField('content')
    private = models.BooleanField(default=True)
    pid = models.TextField('public id')
    date_created = models.DateTimeField(auto_now_add=True)

