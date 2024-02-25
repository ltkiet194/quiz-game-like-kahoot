from typing import Collection
from django.shortcuts import redirect, render
from crm.func.verify import Verify,Collection
from django.urls import reverse
import requests
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_protect
from uuid import uuid4
from bson import ObjectId
from bson.json_util import dumps
import random ,datetime

def SignupPage(request):
    if request.method == 'POST':
        # Process the form data
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm-password')
        print(email, password, confirm_password)
        is_exist_acc= Collection.is_account(email)  
        hash_password = Verify.hash_password_MD5(password)
        if(is_exist_acc==False):
            acc = {
                "email": email,
                "password": hash_password,
            }
            Collection.account_insert(acc)
            return redirect('login')
        else:
            return redirect('login')
    else:
        return render(request, "crm/host/signup.html")
    

def LoginPage(request):
    
    if (request.session.get('User') is not None):
        return redirect('home')  
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        acc = Collection.Account_Collection.find_one({"email": email})
        hash_password = Verify.hash_password_MD5(password)
        if(acc is None):
            return redirect('signup')
        else:
            if acc["password"] == hash_password:
                request.session['User'] = acc["email"]
                request.session['User_token'] =acc["Token"]["TokenId"]
                return redirect('home')
            else:
                return redirect('login')
    
    return render(request, "crm/host/login.html")

def Home(request):  
    if(request.session.get('User') is None):
        return redirect('login')
    UserSession =  {"email": request.session['User']} #request.session['User'] 
    quizzes = Collection.Quiz_Collection.find({"owner_email":request.session['User']})
    result = []
    for quiz in quizzes:
        quiz= {
            "quizCode": str(quiz["_id"]),
            "name": quiz["name"],
            "description": quiz["description"],
            "owner_email": quiz["owner_email"],
        }
        result.append(quiz)
    UserSession["quizzes"] = result
    return render(request, "crm/host/home.html",context=UserSession)

@csrf_protect
def CreateQuizzes(request):  
    if(request.session.get('User') is None):         
        return redirect('login')
    if request.method == 'POST':
        name = request.POST.get('name')
        description = request.POST.get('description')
        owner_email = request.session['User']
        quiz = {
            "name": name,
            "description": description,
            "owner_email": owner_email,
            "questions": [],
        }
        Collection.Quiz_Collection.insert_one(quiz)
        return redirect('home')  
    return render(request, "crm/host/create.html")
def EditQuiz(request, quizid):
    context = {
        "quizid": quizid,
        "quiz": Collection.Quiz_Collection.find_one({"_id": ObjectId(quizid)}),
    }
    return render(request, 'crm/host/editquiz.html', context=context)



def AddQuestion(request,quizid): 
    print(request.method) 
    if(request.session.get('User') is None):
        return redirect('login')
    if(request.method == "POST"):
        question_text = request.POST.get('question_text')
        answerA = request.POST.get('answerA')
        answerB = request.POST.get('answerB')
        answerC = request.POST.get('answerC')
        answerD = request.POST.get('answerD')
        correct_answer = request.POST.get('correct_answer')
        options = [answerA,answerB,answerC,answerD,correct_answer]
        question_id = str(uuid4())
        quiz = {"question_id":question_id,"question_text": question_text,"options": options}     
        Collection.Quiz_Collection.update_one({"_id": ObjectId(quizid)}, {"$push": {"questions": quiz}})
        return JsonResponse({"data":quiz,"success": True}) 
    return JsonResponse({"success": False})

def RemoveQuestion(request,quizid,questionid):    
    if(request.session.get('User') is None):
        return redirect('login')
    if(request.method == "POST"):

        return JsonResponse({"success": True})
    
    try:
        result = Collection.Quiz_Collection.update_one(
            {"_id": ObjectId(quizid)},
            {"$pull": {"questions": {"question_id": questionid}}}
        )

        if result.modified_count > 0:
            return redirect("edit_quiz",quizid)
        else:
            return JsonResponse({"success": False, "message": "Question not found or not removed."})
    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)})
    

def EditQuestion(request,quizid,questionid):    
    if(request.session.get('User') is None):
        return redirect('login')
    if request.method == "POST":
        try:
            updated_data = {
                "question_id": questionid,               
                "question_text": request.POST.get("question_text"),
                "options": [
                    request.POST.get("answerA"),
                    request.POST.get("answerB"),
                    request.POST.get("answerC"),
                    request.POST.get("answerD"),
                    request.POST.get("correct_answer")
                ]
            }

            result = Collection.Quiz_Collection.update_one(
                {"_id": ObjectId(quizid), "questions.question_id": questionid},
                {"$set": {"questions.$": updated_data}}
            )

            if result.modified_count > 0:
                return JsonResponse({"data":updated_data,"success": True}) 
            else:
                return JsonResponse({"success": False, "message": "Question not found or not updated."})
        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)})
    



def CreateGame(request,quizid):     
    if(request.session.get('User') is None):
        return redirect('login')
    room = Collection.Room_Collection.find_one({"QuizzesId": quizid})
    if room is not None:
        randomNumber = room["RoomCode"]       
        context = {
            'token':request.session.get('User_token'),           
            "quiz": Collection.Quiz_Collection.find_one({"_id": ObjectId(quizid)}),
            "room": room,
            "quizid": quizid
        }     
    else:
        randomNumber = random.randint(10000000, 99999999)
        newRoom = {
            "CreateAt": datetime.datetime.now(),
            "UpdateAt": datetime.datetime.now(),
            "RoomCode": randomNumber,
            "RoomName": "Room: " + str(randomNumber),
            "isStarted": False,
            "isEnd": False,
            "isFull": False,
            "QuizzesId": quizid,
            "RoomCode": randomNumber
            }
        Collection.Room_Collection.insert_one(newRoom)
        quiz = Collection.Quiz_Collection.find_one({"_id": ObjectId(quizid)})
        context = {
            'token':request.session.get('User_token'),
            "quiz": Collection.Quiz_Collection.find_one({"_id": ObjectId(quizid)}),
            "room": newRoom,
            "quizid": quizid
        }   
    print(context)
    return render(request, 'crm/host/create_game.html',context=context)
    





