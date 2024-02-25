from typing import Collection
from django.shortcuts import redirect, render
from .func.verify import Collection

from django.http import HttpResponse, JsonResponse

def JoinedPage(request,roomCode):  
    response = render(request, "crm/client/homepage.html", {"roomCode": roomCode})
    return response

    return render(request, "crm/client/signup.html")

def JoinGame(request):
    if request.method == 'POST':
        roomCode = request.POST.get("roomCode")  
        if(Collection.is_exist_room(roomCode)==True):
            return redirect('joined',roomCode)                  
    return render(request, "crm/client/joingame.html")


