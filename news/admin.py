from django.contrib import admin
from .models import Category, Post,  Tag, Comment

# Register your models here.


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'added_by', 'updated', 'created', )
    readonly_fields = ('created', 'updated' , 'status')

# Register your models here.
admin.site.register(Category, CategoryAdmin)
admin.site.register(Post)
admin.site.register(Tag)
admin.site.register(Comment)

