# file: myapp/context_processors.py

def user_session(request):
    return {'user_session': request.session.get('User', None)}
def user_token(request):
    return {'user_token': request.session.get('User_token', None)}