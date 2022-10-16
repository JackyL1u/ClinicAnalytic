from flask import Blueprint, jsonify, request
from util.database import database
import hashlib
import jwt
import uuid

routes_auth = Blueprint('routes_auth', __name__, url_prefix='/api/auth')


@routes_auth.route('/register', methods=['POST'], strict_slashes=False)
def register():
    try:
        req = request.get_json()
    except Exception as e:
        return jsonify({'Error': 'Invalid JSON', 'Message': str(e)}), 401

    email = req.get('email')
    password = req.get('password')
    confirmPassword = req.get('confirmPassword')

    if email is None or password is None or confirmPassword is None:
        return jsonify({"status": 401}), 401
    if password != confirmPassword:

        return jsonify({"status": 401, "message": "passwords must match"})

    findUserQuery = database["users"].find_one({"email": email})

    if findUserQuery is not None:
        return jsonify({"status": 401, "message": "user already registered"}), 401

    userID = str(uuid.uuid4())

    encryptedPass = hashlib.sha256(password.encode()).hexdigest()

    userObject = {
        "email": email,
        "password": encryptedPass,
        "userID": userID
    }

    database["users"].insert_one(userObject)

    try:
        sessionToken = jwt.encode({"email": email}, str(uuid.uuid4()), algorithm="HS256").decode('UTF-8')
    except (Exception,):
        sessionToken = jwt.encode({"email": email}, str(uuid.uuid4()), algorithm="HS256")

    database["sessions"].insert_one({"sessionToken": sessionToken, "email": email, "userID": userID})

    return jsonify({"status": 200, "sessionToken": sessionToken, "userID": userID})


@routes_auth.route('/', methods=['GET'], strict_slashes=False)
def getAuth():
    try:
        sessionToken = request.headers.get('Authorization').replace("Token ", "").replace("Bearer ", "")
    except Exception as e:
        return jsonify({'Error': 'No Bearer', 'Message': str(e)}), 401

    session = database["sessions"].find_one({"sessionToken": sessionToken})

    if session is None:
        return jsonify({"status": 401, "message": "session not found"})

    findUserQuery = database["users"].find_one({"userID": session.get("userID")})

    userID = findUserQuery.get("userID")
    email = findUserQuery.get("email")
    hospital_id = findUserQuery.get("hospital_id")
    doctors = list(database["doctors"].find({"hospital_id": hospital_id}, {"_id": False}))

    return jsonify({"status": 200, "userID": userID, "email": email, "doctors": doctors})


@routes_auth.route('/login', methods=['POST'], strict_slashes=False)
def login():
    try:
        req = request.get_json()
    except (Exception,):
        return jsonify({'Error': 'Invalid JSON'}), 401

    email = req.get('email')
    password = req.get('password')

    if email is None or password is None:
        return jsonify({"status": 401}), 401

    findUserQuery = database["users"].find_one({"email": email})

    if findUserQuery is None:
        return jsonify({"status": 401, "message": "invalid login credentials"})

    encryptedPassword = hashlib.sha256(password.encode()).hexdigest()

    if findUserQuery.get("password") == encryptedPassword:
        try:
            sessionToken = jwt.encode({"email": email}, str(uuid.uuid4()), algorithm="HS256").decode('UTF-8')
        except (Exception,):
            sessionToken = jwt.encode({"email": email}, str(uuid.uuid4()), algorithm="HS256")

        database["sessions"].insert_one({"sessionToken": sessionToken, "email": email,
                                         "userID": findUserQuery.get("userID")})

        return jsonify({"status": 200, "sessionToken": sessionToken, "userID": findUserQuery.get("userID")})

    return jsonify({"status": 401, "message": "invalid login credentials"})
