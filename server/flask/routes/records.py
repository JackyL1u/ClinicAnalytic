from flask import Blueprint, jsonify, request
from util.database import database
from util.health_card import health_card_parse

routes_records = Blueprint('routes_records', __name__, url_prefix='/api/records')


@routes_records.route('/get', methods=['GET'], strict_slashes=False)
def get_records():
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
    getRecordsQuery = database["records"].find({"hospital_id": hospital_id}, {"_id": False})

    return jsonify({"status": 200, "userID": userID, "email": email, "records": list(getRecordsQuery)})


@routes_records.route('/add/patient', methods=['POST'], strict_slashes=False)
def add_patient():
    try:
        sessionToken = request.headers.get('Authorization').replace("Token ", "").replace("Bearer ", "")
    except Exception as e:
        return jsonify({'Error': 'No Bearer', 'Message': str(e)}), 401

    session = database["sessions"].find_one({"sessionToken": sessionToken})

    if session is None:
        return jsonify({"status": 401, "message": "session not found"})

    findUserQuery = database["users"].find_one({"userID": session.get("userID")})

    hospital_id = findUserQuery.get("hospital_id")

    try:
        req = request.get_json()
    except (Exception,):
        return jsonify({'Error': 'Invalid JSON'}), 401

    patient_race = req.get('race')
    patient_gender = req.get('gender')
    img = req.get('img')

    healthCard = health_card_parse(img)

    healthCardNum = healthCard[0]
    healthCardName = healthCard[1]
    healthCardName = healthCardName.split(" ")
    healthCardFirst = healthCardName[0]
    healthCardLast = healthCardName[-1]

    findPatientQuery = database["patients"].find_one({
        "health_card_number": healthCardNum
    })

    if findPatientQuery is not None:
        return jsonify({
            "status": 400
        })

    database["patients"].insert_one(
        {
            "firstName": healthCardFirst,
            "lastName": healthCardLast,
            "patient_race": patient_race,
            "health_card_number": healthCardNum,
            "patient_gender": patient_gender,
            "hospital_id": hospital_id
        }
    )

    return jsonify({
        "status": 200
    })
