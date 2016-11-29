from flask import Flask
from flask import request
from flask import jsonify
from bson.json_util import dumps
import pymongo

# Flask app
app = Flask(__name__)

# Connection
conn = None

# Database
db = None

# Collections
users = None
equipment = None
resources = None
admins = None
certifications = None


@app.route('/v1/users', methods=['GET', 'POST'])
def users():
    '''
    POST: New user will be in the body.
    GET: Returns a JSON object containing the list of all the users.
    '''
    if request.method == 'GET':
        # This should return all the users with populated equipments
        queryResult = users.find()
        return dumps({'users': [user for user in queryResult]})
    elif request.method == 'POST':
        # Update the database to add new users
        # Relevant mongoDB API: insertOne
        # Extract new user from the body.
        # Add validation.
        return "PUT users"


@app.route('/v1/user/<string:id>', methods=['GET', 'PATCH'])
def get_user(id):
    # Gets a single user from the user database
    return "Stand alone user " + id


@app.route('/v1/equipment', methods=['GET', 'POST'])
def equipment():
    if request.method == 'GET':
        # returns all the equipment
        return "GET equipment list"
    elif request.method == 'POST':
        # updates the database to include the new equipment
        return "POST to the equiment list from the header"


@app.route('/v1/equipment/<string:id>', methods=['GET'])
def get_equipment(id):
    # returns a single element from the equipment database
    return "GET equipement with id:" + id


@app.route('/v1/certifications', methods=['GET', 'POST'])
def certifications():
    if request.method == 'GET':
        # Return the whole list of certifications
        return "GET certifications"
    elif request.method == 'POST':
        # Update database with new added certification
        return "POST certifications"


@app.route('/v1/user/<string:id>/addcerts', methods=['POST'])
def add_certification_user(id):
    return "POST certificate in header to user " + id


if __name__ == "__main__":
    # try to connect
    try:
        conn = pymongo.MongoClient()
        print "Connected Succesfully"
    except pymongo.errors.Connection, e:
        print "Couldn't connect to the database"
        quit()

    # db
    db = conn.makerspace_db

    # Collections
    users = db.users
    equipment = db.equipment
    certifications = db.certifications
    resources = db.resources
    admins = db.admins

    app.run()
