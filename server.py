from flask import Flask
from flask import request
from flask import jsonify

app = Flask(__name__)

@app.route('/', methods=['GET'])
def get_index():
    # This method should return the index for the makerspace
    return "GET index"

@app.route('/v1/users', methods['GET', 'POST'])
def users():
    if request.method == 'GET':
        # This should return all the users with populated equipments
        return "GET users"
    elif request.method == 'POST':
        # Update the database to add new users
        return "POST new user"

@app.route('/v1/user/<string:id>', methods['GET'])
def get_user(id):
    # Gets a single user from the user database
    return "Stand alone user " + id

@app.route('/v1/equipment', methods=['GET', 'POST'])
def equipment():
    if request.method == 'GET':
        # returns all the equipment
        return "GET equipment list"
    else request.method == 'POST':
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
    else request.method == 'POST':
        # Update database with new added certification
        return "POST certifications"
        
@app.route('/v1/user/<string:id>/addcerts', methods=['POST'])
def add_certification_user(id):
    return "POST certificate in header to user " + id 

if __name__ == "__main__":
    app.run()

