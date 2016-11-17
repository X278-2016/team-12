## mongo NoSQL, DocumentDB
 
from pymongo import MongoClient

if __name__ == "__main__":
    con = MongoClient()

    # Creates new TB called test_db if doesn't exist
    db = con.test_database

    # Creates member variable of our DB object
    users = db.users
    users.insert({'name':'Bob', 'food':'cheese'})
    users.insert({'name':'John', 'location':'USA'})


    users2 = users.find()
    print 'Insert & find'
    for person in users2:
        print person
    users.remove({});

    # SELECT *
    users2 = users.find()
    print 'Insert & find'
    for person in users2:
        print person