import random
from unicodedata import category
from django.shortcuts import render

# Create your views here.

from django.shortcuts import get_object_or_404, redirect, render
from .models import Category, Post, Comment
from django.db.models import Q
import requests as req


# Create your views here.
def index(request):
    # return render(request, 'custom_index.html')
    return redirect(home)

def home(request):
    p={}
    
    category=Category.objects.all()
    p['category']=category
    # This is for the post
    posts=Post.objects.order_by('created')
    count=posts.count()
    posts_random=random.choices(posts, k=count-1)
    p['posts']=posts
    # p['posts']=posts
    p['posts_random']=posts_random

    # API
    # url='http://api.mediastack.com/v1/news?access_key=b1ad7f8a441fccfd694b70aed02b872a&category=trending&languages=en'
    # res=req.get(url)
    # res_json=res.json()
    # res_json_data=res_json['data']
    # # print(res_json_data[:1])
    # # print(res_json_data)
    # p['res_json_data']=res_json_data

    return render(request, 'home.html', p)
    

def blog_list(request, pk=None):
    p={}
    posts=Post.objects.all().order_by('-updated')
    p['posts']=posts
    if posts.count() == 0:
        p['msg']="Sorry this list is empty"
    else:
        p['status']="This is for Josh"
        
    # Search
    # search=Post.objects.filter(title__icontains = "user")
    
    return render(request, 'blog.html', p)

def search(request):
    # category
    category=Category.objects.raw("SELECT * FROM news_category")

    # Useful
    # category=Category.objects.raw("SELECT * FROM news_category order by id desc")
    # category= Category.objects.all().order_by('-updated')
    # print('category')
    
    if 'search_word' in request.GET:
        search_word = request.GET['search_word']
        if search_word:
            posts = Post.objects.order_by('-created').filter(Q(desc__icontains=search_word) | Q(title__icontains=search_word)| Q(author__icontains=search_word) )
            posts_count=posts.count()

    return render(request, 'blog.html',  {
                    'posts' : posts,
                    'posts_count' : posts_count,
                    'category' : category,
                })


def single(request, pk=None):
    p={}
    # Category
    category=Category.objects.all()
    p['category']=category
    post=get_object_or_404(Post, id=pk)
    p['post']=post
    comment=Comment.objects.filter(id=pk)
    comment_count=comment.count()
    p['comment_count']=comment_count
   
    # comments
    if request.method == 'POST':
        comment_name=request.POST['name']
        comment_email=request.POST['email']
        comment_message=request.POST['message']
        comments=Comment.objects.create(
            name=comment_name,
            email=comment_email,
            comment=comment_message,
            comment_owner_id =pk,
        )
        comments.save()        

    comments=Comment.objects.filter(comment_owner_id=pk)
    # comments=Comment.objects.raw(f'SELECT * FROM news_comment WHERE comment_owner_id={pk}')
    comments=comments.order_by("-updated")
    p['comments']=comments
    comments_count=comments.count()
    p['comments_count']=comments_count

    return render(request, 'single.html', p)

def test(request):
    p={}
    post=Post.objects.all()
    p['post']=post
    return render(request, 'test/test.html', p)
    






