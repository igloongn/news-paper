# Django Modules
from django.http.response import HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib import messages

# Local Modules
from .forms import RegistrationForm, UserForm, UserProfileForm
from .models import Account, UserProfile

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
            connect = UserProfile(connect=form.cleaned_data['email']) 
            connect.save()


            # messages.success(request, 'Please Check your Email for confirmation')
            # return redirect('accounts:register')
            return redirect('/accounts/login/?command=verification&email='+email)

    else:
        form = RegistrationForm()
    p['form']=form

    return render(request, 'accounts/register.html', p)

def login_user(request):
    print(request.user.is_authenticated)
    if request.user.is_authenticated:
        print("User is logged in :!)")
        return redirect('home')
    else:
        print("User is not logged in :(")
        if request.method == 'POST':
            print("We are working on it :(")
            email=request.POST['email']
            password=request.POST['password']
            user = auth.authenticate(email=email, password=password)

            if user is not None:
                auth.login(request, user)
                # print(user.username)
                messages.success(request, 'You are now Logged in ')
                url = request.META.get('HTTP_REFERER')
                try:
                    query=requests.utils.urlparse(url).query

                    # next=cart/checkout
                    params = dict(x.split('=') for x in query.split('&'))
                    if 'next' in params:
                        nextPage = params['next']
                        return redirect(nextPage)
                except:
                    return redirect('home')
            else:
                messages.error(request, 'Invalid Login!!')
                return redirect('account:login')


    return render(request, 'accounts/login.html')
    
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
            return redirect('accounts:login')

        else:
            messages.error(request, 'Account does not exist')
            return redirect('accounts:forgotpassword')


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
        return redirect('accounts:resetpassword')
    else:
        messages.error(request, 'This link  has been expired!')
        return redirect('accounts:login')
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
            return redirect('accounts:login')
        else:
            messages.error(request, 'Password do not match')
            return redirect('accounts:resetpassword')
    else:
        return render(request, 'accounts/email/resetpassword.html')
    
# DASHBOARD
# @login_required(login_url='accounts:login')
# def dashboard(request):
#     if UserProfile.objects.filter(user=request.user.id).exists():
#         # orders = OrderProduct.objects.order_by('-created_at').filter(user=request.user, ordered=True)
#         orders = Order.objects.order_by('-created_at').filter(user_id=request.user.id, is_ordered=True)
#         orders_count = orders.count()
#         userprofile=UserProfile.objects.get(user_id=request.user.id)
#     else:
#         userprofile=None
#         orders_count= 0

#         orders = Order.objects.order_by('-created_at').filter(user_id=request.user.id, is_ordered=True)

#         orders_count = orders.count()
#         userprofile=request.user.id
#     params={
#         'orders_count' : orders_count,
#         'userprofile' : userprofile,
#     }
#     return render(request, 'dashboard.html', params)

@login_required(login_url='accounts:login')
def my_orders(request):
    orders=Order.objects.order_by('-created_at').filter(user=request.user, is_ordered=True)
    params={
        'orders' : orders,    
    }
    return render(request, 'accounts/my_orders.html', params)

@login_required(login_url='accounts:login')
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
    

@login_required(login_url='accounts:login')
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
    
    
@login_required(login_url='accounts:login')
def order_detail(request, order_no):
    order_detail=OrderProduct.objects.filter(order__order_number=order_no, ordered=True)
    order=Order.objects.get(order_number=order_no, is_ordered=True)
    if order.is_ordered:
        status='Paid'
    
    total=0
    quantity=0
    tax=0
    grand_total=0 

    
    for cart_item in order_detail:
        total += (cart_item.product.price * cart_item.quantity)
        quantity += cart_item.quantity
    tax = (8 * total)/100
    grand_total = total + tax

    params={
        'order_detail':order_detail,
        'order':order,
        'status':status,
            'total' : total,
            'quantity' : quantity,
            'tax' : tax,
            'grand_total' : grand_total,
    }
    return render(request, 'accounts/order_detail.html', params)
    
    



