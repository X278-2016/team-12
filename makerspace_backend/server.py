from flask import Flask
from flask import request
from flask import Response
from bson import ObjectId
from bson.json_util import dumps
import pymongo

# Flask app
app = Flask(__name__)

# Connection
conn = None

# Database
db = None

# Collections
users_collection = None
equipment_collection = None
resources_collection = None
admins_collection = None
certifications_collection = None


@app.route('/v1/users', methods=['GET', 'POST'])
def users():
    '''
    POST: New user will be in the body.
    GET: Returns a JSON object containing the list of all the users.
    '''
    if request.method == 'GET':
        # This should return all the users with populated equipments
        queryResult = users_collection.find()
        response_dict = dumps({'users': [user for user in queryResult]})
        return Response(response_dict, mimetype='application/json')
    elif request.method == 'POST':
        # Update the database to add new users
        # Relevant mongoDB API: insertOne
        # Extract new user from the body.
        # Add validation.
        return "PUT users"


@app.route('/v1/user/<string:id>', methods=['GET', 'PATCH'])
def get_user(id):
    '''
    GET: Gets the user identified by the given vunet id
    PATCH: Updates user data.
    '''
    if request.method == 'GET':
        # This querie for a single user from the user database, returns None if no such user.
        queryResult = users_collection.find_one({"vunetID": id})
        return Response(dumps(queryResult), mimetype='application/json') \
            if queryResult is not None else Response(dumps(dict()), mimetype='application/json')
    elif request.method == 'PATCH':
        return "PATCH user"


@app.route('/v1/equipment', methods=['GET', 'POST'])
def equipment():
    if request.method == 'GET':
        queryResult = equipment_collection.find()
        response_dict = dumps({'equipment': [equip for equip in queryResult]})
        return Response(response_dict, mimetype='application/json')
    elif request.method == 'POST':
        # updates the database to include the new equipment
        return "POST to the equiment list from the header"


@app.route('/v1/equipment/<string:id>', methods=['GET'])
def get_equipment(id):
    # returns a single element from the equipment database
    queryResult = equipment_collection.find({'_id': ObjectId(id)})
    return Response(dumps(queryResult), mimetype='application/json') \
        if queryResult is not None else Response(dumps(dict()), mimetype='application/json')


@app.route('/v1/certifications', methods=['GET', 'POST'])
def certifications():
    if request.method == 'GET':
        queryResult = certifications_collection.find()
        response_dict = dumps({'certifications': [cert for cert in queryResult]})
        return Response(response_dict, mimetype='application/json')
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
    users_collection = db.users
    equipment_collection = db.equipment
    certifications_collection = db.certifications
    resources_collection = db.resources
    admins_collection = db.admins

    app.run()
