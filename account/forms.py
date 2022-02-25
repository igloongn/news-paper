from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.db.models import fields
from .models import Account, UserProfile

class RegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'placeholder': 'Enter Password Here',
        'type': 'password',
        'class': 'form-control',
    }))
    confirm_password = forms.CharField(widget=forms.PasswordInput(attrs={
        'placeholder': 'Confirm Password ',
        'type': 'password',
        'class': 'form-control',
    }))
    first_name = forms.CharField(widget=forms.PasswordInput(attrs={
        'placeholder': 'Enter First name Here',
        'type': 'text',
        'class': 'form-control',
    }))
    last_name = forms.CharField(widget=forms.PasswordInput(attrs={
        'placeholder': 'Enter Last name Here',
        'type': 'text',
        'class': 'form-control',
    }))
    email =     forms.CharField(widget=forms.PasswordInput(attrs={
        'placeholder': 'Enter Email Here',
        'type': 'email',
        'class': 'form-control',
    }))
    phone_number = forms.CharField(widget=forms.PasswordInput(attrs={
        'placeholder': 'Enter Phone Number Here',
        'type': 'tel',
        'class': 'form-control',
        'pattern': '[0-9]{11}',
    }))
    
    class Meta:
        model = Account
        fields = ['first_name','last_name','phone_number', 'email', 'password']

    # THIS IS TO COMMUNICATE WITH ALL THE FIELDS
    def __init__(self, *args, **kwargs):
        super(RegistrationForm, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'form-control'
         
    def clean(self):
        clean_data = super(RegistrationForm, self).clean()
        password=clean_data.get('password')
        confirm_password=clean_data.get("confirm_password")
        
        if password != confirm_password:
            raise forms.ValidationError(
                'Password not match!'
            )

class UserForm(forms.ModelForm):
    # phone_number = forms.CharField(widget=forms.PasswordInput(attrs={
    #     'placeholder': 'Enter Phone Number Here',
    #     'type': 'tel',
    #     # 'class': 'form-control',
    #     # 'pattern': '[0-9]{11}',
    # }))
    class Meta:
        model = Account
        fields = ('first_name', 'last_name', 'phone_number')
    
        # THIS IS TO COMMUNICATE WITH ALL THE FIELDS
    def __init__(self, *args, **kwargs):
        super(UserForm, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'form-control'
     

class UserProfileForm(forms.ModelForm):
    profile_picture=forms.ImageField(required=False, error_messages={'Invaid':('Image file only')}, widget=forms.FileInput)
    class Meta:
        model = UserProfile
        fields = ['profile_picture', 'address', 'about_yourself']
            # THIS IS TO COMMUNICATE WITH ALL THE FIELDS
    def __init__(self, *args, **kwargs):
        super(UserProfileForm, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'form-control'


