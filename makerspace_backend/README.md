##Running tests and Setting up the Testing Environment
The tests for the backend are found in `makerspace_backend_tests.py`. To run the tests, you need to first set up a virtual environment for building the dependencies listed in `requirements.txt`. Note: these instructions were written for Mac OSX and might differ slightly on Windows.
#####Virtual Environment, Python, and Mongo Installation
If you haven't already, install Python the virtualenv tool (info to do so found [here](https://virtualenv.pypa.io/en/stable/installation/)). Moreover, you need to have a running instance of MongoDB on your machine. Run `$ mongod` to start your Mongo instance on your local machine. To ensure that it's working, you can run commands directly in the `$ mongo` REPL.

#####Starting Virtual Environment
To create your environment, run `$ virtualenv venv`. You can start the environment by running `$ source venv/bin/activate`.
#####Installing dependencies
Run `$ pip install -r requirements.txt`. If there are issues running this command, you might need to run `$ pip install --upgrade pip` to upgrade your environment's `pip` utility.
#####Populating Database
Run `$ python populate_db.py`. This is required for automated tests to pass. When running this script the insertions should be written to the console as well so you can ensure it seems like everything worked properly.
#####Running Tests
If everything ran properly, you should be able to run tests by running `$ python makerspace_backend_tests.py`.
