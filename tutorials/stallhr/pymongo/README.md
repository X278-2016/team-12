The test program creates a database on the locally hosted mongod instance and inserts data into it. If the database already exists, it will simply add to it.


To load up data into the database, use
```
$ mongoimport --db test_database --collection users --file db.json
```
in the same directory as your db.json file.