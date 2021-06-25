from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import authenticate, login, logout


# Create your views here.

def home(request):
    return render(request, 'home.html')


def about(request):
    return render(request, 'about.html')


def login_page(request):
    form = AuthenticationForm()
    if request.method == "POST":
        us = request.POST.get('username')
        ps = request.POST.get('password')

        user = authenticate(request, username=us, password=ps)

        if user is not None:
            login(request, user)
            messages.success(request, 'Log In Successful')
            return redirect('home')
        else:
            messages.error(request, 'Wrong username or password')
    context = {'form': form}
    return render(request, 'login.html', context)


def signup_page(request):
    form = UserCreationForm(request.POST)

    if request.method == 'POST':
        if form.is_valid():
            form.save()
            messages.success(request, 'Sign up successful')
            return redirect('login')

        else:
            for error in form.errors:
                print(error)
                if error == 'username':
                    message = 'Username Taken'
                    messages.error(request, message)
                if error == 'password2':
                    message = 'Passwords do not match or the password is not complex enough'
                    messages.error(request, message)

    context = {'form': form}
    return render(request, 'signup.html', context)


def logout_user(request):
    logout(request)
    messages.success(request, 'Log out successful')
    return redirect('home')
