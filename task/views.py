from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User, auth
from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Posts
import uuid
import json

# Create your views here.


# auth
@csrf_exempt
def register(request):
    if request.method == 'POST':
        firstname = request.POST['firstname']
        lastname = request.POST['lastname']
        password1 = request.POST['password1']
        password2 = request.POST['password2']
        email = request.POST['email'].lower()

        if password1 != password2:
            messages.info(request, "Passwords must match")
        elif User.objects.filter(username=email).exists():
            messages.info(request, "Email has been used")
        else:
            user = User.objects.create_user(username=email, first_name=firstname, last_name=lastname,
                                            email=email, password=password1)
            user.save()
            return redirect('/login')
    return render(request, 'register.html')


@csrf_exempt
def login(request):
    if request.method == 'POST':
        password = request.POST['password']
        email = request.POST['email'].lower()

        user = auth.authenticate(username=email, password=password)
        if user:
            auth.login(request, user)
            return redirect('/dash')
        messages.info(request, "Username or password incorrect!")
    return render(request, 'login.html')


def logout(request):
    auth.logout(request)
    return redirect('/')


# resources
def index(request):
    posts = Posts.objects.filter(private=False)[::-1]
    return render(request, 'index.html', {'posts': posts})


def dash(request):
    if request.user.is_authenticated:
        user = request.user
        posts = Posts.objects.filter(user_id=user.id)[::-1]
        return render(request, 'dash.html', {'posts': posts})
    messages.info(request, "User not authenticated!!")
    return redirect('/login')


@csrf_exempt
def create_post(request):
    if not request.user.is_authenticated:
        messages.info(request, "User not authenticated!!")
        return redirect('/login')
    if request.method == "POST":
        title = request.POST['title']
        pid = str(uuid.uuid4())
        user_id = request.user.id

        content = request.POST['content']
        c = content.split(" ")
        if len(c) > 255:
            messages.info(request, "You can't have more than 255 words!")
            return render(request, 'create.html', {'title': title, 'content': content})
        if Posts.objects.filter(title=title).exists():
            messages.info(request, "Post with title already present")
            return render(request, 'create.html', {'title': title, 'content': content})

        post = Posts(
            title=title,
            content=content,
            pid=pid,
            user_id=user_id
        )
        post.save()
        return redirect('/dash')
    return render(request, 'create.html')


@csrf_exempt
def edit_post(request, pid: str):
    if not request.user.is_authenticated:
        messages.info(request, "User not authenticated!!")
        return redirect('/login')
    try:
        post = Posts.objects.get(pid=pid)
    except Posts.DoesNotExist:
        messages.info(request, "Post not found")     # should not happen
        return redirect('/dash')

    if post.user_id != request.user.id:
        messages.info(request, "You are not authorized to perform action!")

    if request.method == 'POST':
        title = request.POST['title']
        content = request.POST['content']
        post.title = title
        post.content = content
        post.save()
        return redirect('/dash')
    return render(request, 'edit.html', {'post': post})


def publish_post(request, pid: str):
    """
    Change post availability to public
    """
    if not request.user.is_authenticated:
        messages.info(request, "User not authenticated!!")
        return redirect('/login')
    try:
        post = Posts.objects.get(pid=pid)
    except Posts.DoesNotExist:
        messages.info(request, "Post not found")     # should not happen
        return redirect('/dash')
    if post.user_id != request.user.id:
        messages.info(request, "You are not authorized to perform action!")

    post.private = False
    post.save()
    return redirect('/dash')


def delete_post(request, pid: str):
    if not request.user.is_authenticated:
        messages.info(request, "User not authenticated!!")
        return redirect('/login')
    try:
        post = Posts.objects.get(pid=pid)
    except Posts.DoesNotExist:
        messages.info(request, "Post not found")     # should not happen
        return redirect('/dash')
    if post.user_id != request.user.id:
        messages.info(request, "You are not authorized to perform action!")

    post.delete()
    return redirect('/dash')
