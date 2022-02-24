from django.urls import path, re_path
from . import views as v

# app_name = AppName

urlpatterns = [
    path('', v.home, name='home'),
    path('blog/', v.blog_list, name='blog_list'),
    path('full_post/<int:pk>', v.single, name='single'),
    path('search/', v.search, name='search'),


    # TEST
    path('test', v.test, name='test')
]