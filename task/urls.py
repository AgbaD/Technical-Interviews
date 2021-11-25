from django.urls import path
import views

urlpatterns = [
    path('/register', views.register, name="register"),
    path('/login', views.login, name='login'),
    path('/logout', views.logout, name='logout'),

]
