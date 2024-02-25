from django.urls import path

from . import client_views 
from .controller import host_view 

urlpatterns = [
    # Client
    path("", client_views.JoinGame, name="joingame"),
    path("joined/<str:roomCode>", client_views.JoinedPage, name="joined"),
    
    # Host
    path("signup/", host_view.SignupPage, name="signup"),
    path("login/", host_view.LoginPage, name="login"),
    path("home/", host_view.Home, name="home"),
    path("create-quizzes/", host_view.CreateQuizzes, name="create_quizzes"),
    path("edit-quizzes/<str:quizid>", host_view.EditQuiz, name="edit_quiz"),
    
    path("edit-question/?quiz=<str:quizid>&question=<str:questionid>", host_view.EditQuestion, name="edit_question"),
    path("create-question/<str:quizid>", host_view.CreateGame, name="create_game"),
    path("remove-question/?quiz=<str:quizid>&question=<str:questionid>", host_view.RemoveQuestion, name="remove_question"),
    path("add-question/<str:quizid>", host_view.AddQuestion, name="add_question"),
]