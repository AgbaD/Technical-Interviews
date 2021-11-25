from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('dash', views.dash, name='dash'),
    path('login', views.login, name='login'),
    path('edit', views.edit_post, name='edit'),
    path('logout', views.logout, name='logout'),
    path('delete', views.delete_post, name="delete"),
    path('create', views.create_post, name='create'),
    path('register', views.register, name="register"),
    path('publish', views.publish_post, name='publish'),

]
