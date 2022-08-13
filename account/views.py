# Django Modules
from django.http.response import HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib import messages

# Local Modules
from .forms import RegistrationForm, UserForm, UserProfileForm
from .models import Account, UserProfile

from django.contrib.auth.models import User

# Authentication
from django.contrib import auth
from django.contrib.auth.decorators import login_required

# FOR EMAIL VERIFICATION
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage, message


import requests

# Create your views here.

def test(request):
    p={}

    return render(request, "list.html", p)
    
def register(request):
    p={}
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            first_name = form.cleaned_data['first_name']
            last_name = form.cleaned_data['last_name']
            email = form.cleaned_data['email']
            phone_number = form.cleaned_data['phone_number']
            password = form.cleaned_data['password']
            username=email.split('@')[0]
            user = form.save(commit=False)
            # user = Account.objects.create_user(first_name=first_name, last_name=last_name,email=email,username=username, password=password )
            user = Account.objects.create_user(first_name=first_name, last_name=last_name,email=email,username=username, password=password )
            user.phone_number=phone_number
            user.set_password(password)
            user.save()
            user_inbuilt = User.objects.create_user(first_name=first_name, last_name=last_name,email=email,username=username, password=password )
            user_inbuilt.set_password(password)
            user_inbuilt.save()



            # USER EMAIL ACTIVATION
            current_site = get_current_site(request)
            mail_subject = 'Please activate your account'
            message = render_to_string('accounts/email/account_verification.html', {
                'user' : user,
                'domain' : current_site,
                'uid' : urlsafe_base64_encode(force_bytes(user.pk)),
                'token' : default_token_generator.make_token(user),
            })
            to_email = email
            send_email = EmailMessage(mail_subject, message, to=[to_email])
            send_email.send()
            # EMAIL END

            # connect = UserProfile(connect=form.cleaned_data['email'],user=None,profile_picture=None,about_yourself=None) 
            person = UserProfile(user=user, connect=form.cleaned_data['email']) 
            person.save()


            # messages.success(request, 'Please Check your Email for confirmation')
            # return redirect('accounts:register')
            return redirect('/accounts/login/?command=verification&email='+email)

    else:
        form = RegistrationForm()
    p['form']=form

    return render(request, 'accounts/register.html', p)


def login_user(request):
    print(f"Is Login:  {request.user.is_authenticated}")
    if request.user.is_authenticated == True:
        print(f"Login: {request.user.is_authenticated}")
        redirect("home")
    else:
        if request.method == "POST":
            email = request.POST['email']
            password = request.POST['password']
            username=email.split('@')[0]
            # # print(f"Username =  {username}")
            # print(f"Email =  {email}")
            # print(f"Password =  {password}")
            user = auth.authenticate(username=username, password=password)
            # print(f"User::  {user}")
            if user:
                auth.login(request, user)
                return redirect('home')
            else:
                return redirect('account:login')
    # return render(request, 'accounts/login.html')
    return render(request, 'accounts/github_login.html')

    
@login_required(login_url = 'account:login')
def logout(request):
    auth.logout(request)
    messages.success(request, 'You are Logged out')

    return redirect('account:login')

# EMAIL ACTIVATION
def activate(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = Account._default_manager.get(pk=uid)
    except(TypeError, ValueError, OverflowError, Account.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        messages.success(request, 'Congratulation! Your account is activated')
        return redirect('account:login')
    else:
        messages.error(request, 'invalid activation link')
        return redirect('account:register')

def forgotpassword(request):
    if request.method == 'POST':
        email = request.POST['email']
        if Account.objects.filter(email=email).exists():
            user = Account.objects.get(email__iexact=email)

            # USER RESET PASSWORD EMAIL
            current_site = get_current_site(request)
            mail_subject = 'Reset your Password'
            message = render_to_string('accounts/email/reset_password_email.html', {
                'user' : user,
                'domain' : current_site,
                'uid' : urlsafe_base64_encode(force_bytes(user.pk)),
                'token' : default_token_generator.make_token(user),
            })
            to_email = email
            send_email = EmailMessage(mail_subject, message, to=[to_email])
            send_email.send()

            messages.success(request, 'Password reset email has been sent to your email address')
            return redirect('account:login')

        else:
            messages.error(request, 'Account does not exist')
            return redirect('account:forgotpassword')
    elif request.method == 'GET':
        return render(request, 'accounts/forgotpassword.html')

    return render(request, 'accounts/forgotpassword.html')
    
def resetpassword_validate(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = Account._default_manager.get(pk=uid)
    except(TypeError, ValueError, OverflowError, Account.DoesNotExist):
        user = None
    if user is not None and default_token_generator.check_token(user, token):
        request.session['uid'] = uid
        messages.success(request, 'Please reset your password')
        return redirect('account:resetpassword')
    else:
        messages.error(request, 'This link  has been expired!')
        return redirect('account:login')
    return render(request, 'accounts/email/reset_password_email.html')

def resetpassword(request):
    if request.method == 'POST':
        password = request.POST['password']
        confirm_password = request.POST['confirm_password']

        if password == confirm_password:
            uid = request.session.get('uid')
            user = Account.objects.get(pk=uid)
            user.set_password(password)
            user.save()
            messages.success(request, 'Password reset successful')
            return redirect('account:login')
        else:
            messages.error(request, 'Password do not match')
            return redirect('account:resetpassword')
    else:
        return render(request, 'accounts/email/resetpassword.html')

@login_required(login_url='account:login')

@login_required(login_url='account:login')
def edit_profile(request):
    # if UserProfile.objects.filter(user=request.user.id).exists():
    connect = Account.objects.get(email=request.user)
    print(request.user)
    print(connect.email)
    userprofile = get_object_or_404(UserProfile, connect=connect.email) 
    print('!!!!!!!')
    print('!!!!!!!')
    print(userprofile.profile_picture.url)

    if request.method == 'POST':
        user_form = UserForm(request.POST, instance=request.user)
        userProfile_form = UserProfileForm(request.POST, request.FILES,instance=userprofile)
        if user_form.is_valid() and userProfile_form.is_valid():
            user_form.save()
            userProfile_form.user=connect.email
            userProfile_form.save()
            messages.success(request, 'Your Profile has been updated')
            return redirect('accounts:edit_profile')
    else:
        user_form = UserForm(instance=request.user)
        userProfile_form = UserProfileForm(instance=userprofile)
            
    # If the table is empty
    # else:
    #     userprofile = None
    #     user_form = UserForm()
    #     userProfile_form = UserProfileForm()
    #     if request.method == 'POST':
    #         user_form = UserForm(request.POST)
    #         userProfile_form = UserProfileForm(request.POST, request.FILES)
    #         if user_form.is_valid() and userProfile_form.is_valid():
    #             user_form.save()
    #             userProfile_form.save()
    #             messages.success(request, 'Your Profile has been updated')
    #             return redirect('accounts:edit_profile')
    #     else:
    #         user_form = UserForm(instance=request.user)
    #         userProfile_form = UserProfileForm(instance=request.user)
    params={
        'user_form' : user_form,
        'profile_form' : userProfile_form,
        'userprofile' : userprofile,
    }
    return render(request, 'accounts/edit_profile.html', params)
    

@login_required(login_url='account:login')
def change_password(request):
    if request.method =='POST':
        current_password = request.POST['cpassword']
        new_password = request.POST['new_password']
        confirm_password = request.POST['confirm_password']

        user= Account.objects.get(username__exact=request.user.username)

        if new_password == confirm_password:
            checkcurrentpassword = user.check_password(current_password)
            if checkcurrentpassword:
                user.set_password(new_password)
                user.save()
                # This will LOG the user OUT
                # auth.logout(request)
                messages.success(request, 'Password Updated successfully.')
                return redirect('accounts:change_password')
            else:
                messages.error(request, 'Please enter valid Password')
                return redirect('accounts:change_password')
        else:
                messages.error(request, 'Password does not match!')
                return redirect('accounts:change_password')
            
    params={

    }
    return render(request, 'accounts/change_password.html', params)
    
 



