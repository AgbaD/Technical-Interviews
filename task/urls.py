from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('dash/', views.dash, name='dash'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('create/', views.create_post, name='create'),
    path('register/', views.register, name="register"),
    path('edit/<str:pid>/', views.edit_post, name='edit'),
    path('delete/<str:pid>/', views.delete_post, name="delete"),
    path('publish/<str:pid>/', views.publish_post, name='publish'),

]
