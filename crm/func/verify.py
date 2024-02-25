import hashlib
from db_connection import db


# Create your models here.

class Verify:
    def __init__(self):
        pass
    @classmethod
    def hash_password_MD5(self, password):
        return hashlib.md5(password.encode()).hexdigest()
    @classmethod
    def is_exist(self, username):
        user = self.User_Collection.find_one({"Username": username})
        if user is not None:
            return True
        else:
            return False

    @classmethod
    def verify_user(self, email, password):
        user = self.User_Collection.find_one({"Username": email})
        if user is not None:
            hashed_password = self.hash_password_MD5(password)
            if user["Password"] == hashed_password:
                return True
            else:
                return False
        else:
            return False
        
class Collection:
    User_Collection = db["User"]
    Room_Collection = db["RoomModel"]
    Account_Collection = db["Account"]
    Quiz_Collection = db["Quizzes"]
    def __init__(self):
        pass
    @classmethod
    def is_exist_room(self, roomCode):
        print("roomCode:",roomCode)
        room =self.Room_Collection.find_one({"RoomCode": roomCode})
        print("room:",room)
        if room is not None:
            print("true")
            return True
        else:
            return False
        
    @classmethod
    def is_account(self, email):
        acc =self.Account_Collection.find_one({"email": email})
        if acc is not None:
            return True
        else:
            return False
        
    @classmethod
    def account_insert(self, account):
        self.Account_Collection.insert_one(account)
        return True