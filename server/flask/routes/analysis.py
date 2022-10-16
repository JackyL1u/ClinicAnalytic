from flask import Blueprint, jsonify, request
from util.database import database
from util.analyze import Analyze

routes_analysis = Blueprint('routes_analysis', __name__, url_prefix='/api/analyze')


@routes_analysis.route('/', methods=['GET'], strict_slashes=False)
def analysis():
    try:
        sessionToken = request.headers.get('Authorization').replace("Token ", "").replace("Bearer ", "")
    except Exception as e:
        return jsonify({'Error': 'No Bearer', 'Message': str(e)}), 401

    session = database["sessions"].find_one({"sessionToken": sessionToken})

    if session is None:
        return jsonify({"status": 401, "message": "session not found"})

    findUserQuery = database["users"].find_one({"userID": session.get("userID")})

    getRecords = database["records"].find({"hospital_id": findUserQuery.get("hospital_id")}, {"_id": False})

    analyze = Analyze(list(getRecords))
    encoded_data = analyze.all()

    return jsonify(
        {
            "encoded_data": encoded_data
        }
    )


@routes_analysis.route('/doctor', methods=['POST'], strict_slashes=False)
def analysis_doctor():
    try:
        sessionToken = request.headers.get('Authorization').replace("Token ", "").replace("Bearer ", "")
    except Exception as e:
        return jsonify({'Error': 'No Bearer', 'Message': str(e)}), 401

    session = database["sessions"].find_one({"sessionToken": sessionToken})

    if session is None:
        return jsonify({"status": 401, "message": "session not found"})

    findUserQuery = database["users"].find_one({"userID": session.get("userID")})

    try:
        req = request.get_json()
    except (Exception,):
        return jsonify({'Error': 'Invalid JSON'}), 401

    doctor_id = req.get('doctor_id')

    getRecords = database["records"].find({"hospital_id": findUserQuery.get("hospital_id")}, {"_id": False})

    analyze = Analyze(list(getRecords))
    encoded_data = analyze.doctor_stats(doctor_id)

    return jsonify(
        encoded_data
    )

