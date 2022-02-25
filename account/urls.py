from django.urls import path, re_path

from .views import dashboard, login_user, logout, register, activate, forgotpassword,resetpassword_validate, resetpassword, my_orders, change_password, edit_profile, order_detail


app_name = 'account'

urlpatterns = [
    # path('', cart, name='cart'),
    path('register/', register, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout, name='logout'),
    path('dashboard/', dashboard, name='dashboard'),
    path('', dashboard, name='dashboard'),

    # FOR EMAIL
    path('activate/<uidb64>/<token>/', activate, name='activate'),
    path('forgotpassword', forgotpassword, name='forgotpassword'),

    path('resetpassword_validate/<uidb64>/<token>/', resetpassword_validate, name='resetpassword_validate'),

    path('resetpassword/', resetpassword , name='resetpassword'),
    # end email
    path('my_orders/', my_orders, name='my_orders'),
    path('edit_profile/', edit_profile ,name='edit_profile'),
    path('change_password/', change_password ,name='change_password'),
    path('order_detail/<int:order_no>/', order_detail ,name='order_detail'),


]