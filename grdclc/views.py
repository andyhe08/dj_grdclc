from django.shortcuts import render, redirect
from django.http import Http404
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
            return redirect('home')
        else:
            # CHANGE IN FUTURE
            messages.error(request, 'Wrong username or password')
    context = {'form': form}
    return render(request, 'login.html', context)


def signup_page(request):
    form = UserCreationForm(request.POST)

    if request.method == 'POST':
        if form.is_valid():
            form.save()
            return redirect('login')

        # else:
        #     raise Http404('user wrong')
    context = {'form': form}
    return render(request, 'signup.html', context)


def logout_user(request):
    logout(request)
    return redirect('home')
