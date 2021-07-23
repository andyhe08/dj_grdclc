from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import authenticate, login, logout
from .reader import *

from .models import Data, DataReqst


# Create your views here.

def home(request):
    context = {'loadin': ""}

    if request.method == 'POST':
        prevData = Data.objects.filter(username=request.user.id)
        data = request.POST.get("data")
        for q in prevData:
            if getClassName(data) in q.course and q.course in getClassName(data):
                q.delete()
        saveData(request, data)
        messages.success(request, 'Save Successful')
        context = {'loadin': data}

    if len(DataReqst.objects.all()) == 1:
        context = {'loadin': DataReqst.objects.all()[0].enc}
        DataReqst.objects.all().delete()

    return render(request, 'home.html', context)


def about(request):
    return render(request, 'about.html')


def specifics(request):
    return render(request, 'specifics.html')


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


def my_classes(request):
    if request.method == "POST":
        target = request.POST.get("whereto")
        if "|~|~|delete|~|~|" in target:
            Data.objects.filter(username=request.user.id, course=target.split("|~|~|delete|~|~|")[1]).delete()
            messages.error(request, 'Delete Successful')
        else:
            Datas = Data.objects.filter(username=request.user.id, course=target)
            DataReqst.objects.all().delete()
            nDRQ = DataReqst()
            nDRQ.enc = formLoadin(Datas)
            nDRQ.save()
            return redirect('home')
    classes = Data.objects.filter(username=request.user.id)
    uC = []
    classNames = []
    for c in classes:
        for cl in uC:
            classNames.append(cl.course)
        if c.course not in classNames:
            uC.append(c)
    uC.reverse()
    context = {'classes': uC}
    return render(request, 'my_classes.html', context)
