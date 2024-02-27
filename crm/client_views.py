from typing import Collection
from django.shortcuts import redirect, render
from .func.verify import Collection

from django.http import HttpResponse, JsonResponse

def JoinedPage(request,roomCode):  
    room = Collection.Room_Collection.find_one({"RoomCode": roomCode})
    response = render(request, "crm/client/homepage.html", {"roomCode": roomCode})
    
    if room is not None:      
        if room["Online"] == True:       
            response = render(request, "crm/client/homepage.html", {"roomCode": roomCode})
        elif room["Online"] == False:
            print("phong chua online")
            response = redirect("joingame")
    return response


def JoinGame(request):
    if request.method == 'POST':
        roomCode = request.POST.get("roomCode")  
        if(Collection.is_exist_room(roomCode)==True):
            return redirect('joined',roomCode)                  
    return render(request, "crm/client/joingame.html")


