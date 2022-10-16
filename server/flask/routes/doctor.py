from flask import Blueprint, jsonify, request
from util.database import database
import hashlib
import jwt
import uuid

routes_doctor = Blueprint('routes_doctor', __name__, url_prefix='/api/doctor')


@routes_doctor.route('/add', methods=['POST'], strict_slashes=False)
def add_doctor():
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

    firstName = req.get('firstName')
    lastName = req.get('lastName')
    race = req.get('doctor_race')
    gender = req.get('doctor_gender')

    if firstName is None or lastName is None:
        return jsonify({"status": 401}), 401

    database["doctors"].insert_one({
        "hospital_id": hospital_id,
        "firstName": firstName,
        "lastName": lastName,
        "doctor_race": race,
        "doctor_gender": gender
    })

    return jsonify({
        "status": 200
    })


@routes_doctor.route('/procedure', methods=['POST'], strict_slashes=False)
def add_procedure():
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

    patient_disease = req.get('disease')
    healthCardNumber = req.get('healthCardNumber')
    outcome = req.get('medicalStatus')
    doctor_id = req.get('doctor')

    findDoctorQuery = database["doctors"].find_one({"doctor_id": doctor_id, "hospital_id": hospital_id})
    doctor_race = findDoctorQuery.get("doctor_race")
    doctor_gender = findDoctorQuery.get("doctor_gender")

    findPatientQuery = database["patients"].find_one({"health_card_number": healthCardNumber})
    if findPatientQuery is None:
        return {
            "status": 400
        }
    patient_race = findPatientQuery.get("patient_race")
    patient_gender = findPatientQuery.get("patient_gender")

    database["records"].insert_one({
        "doctor_id": doctor_id,
        "doctor_race": doctor_race,
        "doctor_gender": doctor_gender,
        "outcome": outcome,
        "patient_disease": patient_disease,
        "patient_race": patient_race,
        "patient_gender": patient_gender,
        "hospital_id": hospital_id
    })

    return jsonify({
        "status": 200,
        "success": True
    })
