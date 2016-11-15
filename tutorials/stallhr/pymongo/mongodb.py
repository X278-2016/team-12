## mongo NoSQL, DocumentDB
 
from pymongo import MongoClient

if __name__ == "__main__":
    con = MongoClient()

    # Creates new TB called test_db if doesn't exist
    db = con.test_database

    # Creates member variable of our DB object
    people = db.people
    people.insert({'name':'Bob', 'food':'cheese'})
    people.insert({'name':'John', 'location':'USA'})

    # SELECT *
    peeps = people.find()
    print 'Insert & find'
    for person in peeps:
        print person