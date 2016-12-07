from pymongo import MongoClient
from bson import ObjectId
import calendar
import time

def execute_insertions():
    client = MongoClient()

    ## This value will be changed based on which database we want to use.
    db = client.makerspace_db

    ## Drop existing tables
    db.users.drop()
    db.equipment.drop()
    db.certifications.drop()
    db.resources.drop()
    db.admins.drop()

    ######RESOURCE INSERT###################
    resource_id = ObjectId()
    resource = {"_id": resource_id, "name": "Plastic spool"}
    db.resources.insert_one(resource)
    print 'Inserted resource ' + str(resource)

    ######EQUIPMENT INSERT##################
    equip_id = ObjectId()
    equip = {"_id" : equip_id, "name": "Laser Cutter", "resources": [resource_id]}
    db.equipment.insert_one(equip)
    print 'Inserted equipment ' + str(equip)

    ######CERTIFICATION INSERT##############
    cert_id = ObjectId()
    inserted_cert = {"_id": cert_id, "name": "Lasers", "machines": [equip_id]}
    db.certifications.insert_one(inserted_cert)
    print 'Inserted certification ' + str(inserted_cert)

    ######ADMIN INSERT######################
    admin_id = ObjectId()
    admin = {"_id": admin_id}
    admin["name"] = "Jules White"
    admin["username"] = "jwhite"
    admin["password"] = "password"
    admin["hashedPass"] = "MakingUpAHashIsSilly"
    admin["salt"] = "ThisIsMySalt"
    db.admins.insert_one(admin)
    print 'Inserted admin ' + str(admin)

    print '\n-------------------------User Insertions--------------------'
    ######USER1 INSERT######################
    user1_id = ObjectId()
    toAdd = {"_id" : user1_id}
    toAdd["fullName"] = "Joseph Stahl"
    toAdd["email"] = "joseph.e.stahl@vanderbilt.edu"
    toAdd["major"] = "Computer Science"
    toAdd["school"] = "Engineering"
    toAdd["cardID"] = "=1234~5678"
    toAdd["vunetID"] = "stahlje"
    toAdd["signedIn"] = True
    toAdd["picture"] = ""

    # These IDs come from the insertions above.
    toAdd["approvedFor"] = [equip_id]
    toAdd["certifications"] = cert_id

    currTime = calendar.timegm(time.gmtime())
    toAdd["useLog"] = [{"date": currTime, "machinesUsed" : [equip_id], "resourcesUsed": [{"_id": resource_id, "quantity": "10 grams"}]}]
    print 'First user being inserted: ' + str(toAdd)
    db.users.insert_one(toAdd)

    ######USER2 INSERT######################
    user2_id = ObjectId()
    toAdd = {"_id" : user2_id}
    toAdd["fullName"] = "Harrison Stall"
    toAdd["email"] = "harrison.r.stall@vanderbilt.edu"
    toAdd["major"] = "Computer Science / Mathematics"
    toAdd["school"] = "Engineering"
    toAdd["cardID"] = "=987654321"
    toAdd["vunetID"] = "stallhr"
    toAdd["signedIn"] = True
    toAdd["picture"] = ""

    # These IDs come from the insertions above.
    toAdd["approvedFor"] = [equip_id]
    toAdd["certifications"] = cert_id

    currTime = calendar.timegm(time.gmtime())
    toAdd["useLog"] = [{"date": currTime, "machinesUsed" : [equip_id], "resourcesUsed": [{"_id": resource_id, "quantity": "10 grams"}]}]
    print '\nSecond user being inserted: ' + str(toAdd) 
    db.users.insert_one(toAdd)

if __name__ == '__main__':
    execute_insertions()