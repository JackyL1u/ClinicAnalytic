from flask import Flask
from flask_cors import CORS
from routes.auth import routes_auth
from routes.doctor import routes_doctor
from routes.analysis import routes_analysis
from routes.records import routes_records

app = Flask(__name__)
CORS(app)

app.register_blueprint(routes_auth)
app.register_blueprint(routes_doctor)
app.register_blueprint(routes_analysis)
app.register_blueprint(routes_records)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
