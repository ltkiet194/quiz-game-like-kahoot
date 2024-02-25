# myapp/api.py

from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
from crm.func.verify import Verify,Collection

import json

@csrf_exempt
def quizzes_details(request,email):
    if request.method == 'GET':
        quizzes = Collection.Account_Collection.find_one({"email": email})
        print(quizzes)
        try :
            if quizzes is not None and request.session['User'] == email:          
                print(request.session['User'])
                quizzes['_id'] = str(quizzes['_id'])
                return JsonResponse(quizzes,status=200)
            else:
                return JsonResponse({'error': 'No such quiz found'}, status=404)
        except:
            return JsonResponse({'error': 'No such quiz found'}, status=404)
    elif request.method == 'POST':
        data = json.loads(request.body)
        response_data = {
            'message': f"This is a POST request to the example API. You sent: {data}"
        }
        return JsonResponse(response_data)
    else:
        return JsonResponse({'error': 'Unsupported method'}, status=405)
