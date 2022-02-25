from .models import Category

def cat_list(request):
    p={}
    # Category
    # category=Category.objects.all()
    category=Category.objects.raw("SELECT * FROM news_category")
    return dict(category=category)
    
