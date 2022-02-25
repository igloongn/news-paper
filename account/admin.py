from django.contrib import admin
from .models import Account, UserProfile

from django.utils.html import format_html

# This is to make the password readonly or something like that
from django.contrib.auth.admin import UserAdmin

class AccountAdmin(UserAdmin):
    list_display = ('is_active', 'email', 'first_name', 'last_name' , 'username' , 'last_login' , 'date_joined', 'is_admin')
    list_display_links = ('email', 'first_name', 'last_name')
    readonly_fields = ('last_login', 'date_joined', 'is_active')
    ordering = ('date_joined',)

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

class UserProfileAdmin(admin.ModelAdmin):
    def thumbnail(self, object):
        return format_html("<img src='{}' width='30' style='border-radius:50%;'>".format(object.profile_picture.url))
    thumbnail.short_description = 'Profile Picture'
    list_display = ('id', 'connect', 'user', 'profile_picture')



# Register your models here.
admin.site.register(Account, AccountAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
