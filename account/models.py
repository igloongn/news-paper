from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
# Create your models here.
from django.contrib.auth.models import User

class MyAccountManager(BaseUserManager):
    def create_user(self, first_name, last_name, username, email, password=None):
        if not email:
            raise ValueError('User must have an Email Address')
        if not username:
            raise ValueError('User must have a Username')

        user = self.model(
            first_name = first_name,
            last_name = last_name,
            username = username,
            email = self.normalize_email(email),
        )
        # This is for the PASSWORD
        user.set_password(password)
        # Then save the form
        user.save(using=self._db)
        return user

    def create_superuser(self, first_name, last_name, username, email, password):
        user = self.create_user(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email = self.normalize_email(email),
            password=password,
        )
        user.is_admin = True
        user.is_active = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user
         

class Account(AbstractBaseUser):
    # user=models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    first_name = models.CharField(max_length = 150)
    last_name = models.CharField(max_length = 150)
    username = models.CharField(unique=True, max_length = 150)
    email = models.EmailField(max_length=100, unique=True)
    phone_number = models.CharField(max_length = 150)

    # Required Fields
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField( auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_superadmin = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name' ]
    # This is to tell the self class to use 'MyAccountManager' Below
    objects = MyAccountManager()

    def __str__(self):
        return self.username

    # THIS IS FOR PERMISSION
    def has_perm(self, perm, obj=None):
        return self.is_admin
        
    def has_module_perms(self, add_label):
        return True
    
    def fullname(self):
        return f'{self.first_name} {self.last_name}'
        

class UserProfile(models.Model):
    user = models.OneToOneField(Account, on_delete=models.CASCADE)
    connect = models.CharField(blank=True, max_length=100, null=True)
    # user = models.ForeignKey(Account, on_delete=models.CASCADE)
    address = models.CharField(blank=True, max_length=100, null=True)
    profile_picture = models.ImageField(upload_to='userprofile/', null=True, blank=True)
    # faculty = models.CharField(blank=True, max_length=100)
    # dept = models.CharField(blank=True, max_length=100)    
    about_yourself = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user.username
    
        
    

    


