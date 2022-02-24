from django.db import models
from django.db.models import Model



class Category(Model):
    name = models.CharField(max_length=20)
    added_by = models.CharField(max_length=20, null=True, blank=True)

    status=models.BooleanField(default=True)
    created=models.DateTimeField(auto_now_add=True)
    updated=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    class Meta:
        verbose_name = 'category'
        verbose_name_plural = 'categories'

class Post(Model):
    title=models.CharField( max_length=50)
    author=models.CharField( max_length=50)
    desc=models.TextField()
    tags=models.ManyToManyField('Tag')
    picture = models.ImageField(max_length=100, upload_to='post_image/')
    
    
    status=models.BooleanField(default=True)
    created=models.DateTimeField(auto_now_add=True ,blank=True, null=True)
    updated=models.DateTimeField(auto_now=True ,blank=True, null=True)

    def __str__(self):
        return self.title
        

class Tag(Model):
    tag_name=models.CharField( max_length=50)

    status=models.BooleanField(default=True)
    created=models.DateTimeField(auto_now_add=True)
    updated=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.tag_name

class Comment(Model):
    name = models.CharField(max_length = 150)
    email = models.CharField(max_length = 150)
    comment = models.TextField()
    comment_owner = models.ForeignKey(Post, on_delete=models.CASCADE, blank=True, null=True)

    status=models.BooleanField(default=True)
    created=models.DateTimeField(auto_now_add=True ,blank=True, null=True)
    updated=models.DateTimeField(auto_now=True ,blank=True, null=True)
        
    def __str__(self):
        return self.name
        