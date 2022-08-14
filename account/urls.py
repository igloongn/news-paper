from django.urls import path, re_path

# from .views import dashboard, login_user, logout, register, activate, forgotpassword,resetpassword_validate, resetpassword, my_orders, change_password, edit_profile, order_detail
from . import views as v 


app_name = 'account'

urlpatterns = [
    path('register/', v.register, name='register'),
    path('login/', v.login_user, name='login'),
    path('logout/', v.logout, name='logout'),
    # path('dashboard/', v.dashboard, name='dashboard'),

    # FOR EMAIL
    path('activate/<uidb64>/<token>/', v.activate, name='activate'),
    path('forgotpassword/', v.forgotpassword, name='forgotpassword'),
    path('resetpassword_validate/<uidb64>/<token>/', v.resetpassword_validate, name='resetpassword_validate'),
    path('resetpassword/', v.resetpassword , name='resetpassword'),

    # end email
    # path('my_orders/', v.my_orders, name='my_orders'),
    path('edit_profile/', v.edit_profile ,name='edit_profile'),
    path('change_password/', v.change_password ,name='change_password'),

    # Josh password reset urls
    path('forgot-password/', v.josh_forgot_pass, name='josh_forgot_pass'),
	path('reset-password/<uidb64>/<token>/', v.josh_reset_pass, name='josh_reset_pass'),
]