#Team 12: Makerspace Check-in System

##Background
- Vanderbilt focusing on interdisciplinary innovation and rapid prototyping
- New makerspace in the ESB dedicated to getting undergrad and grad students to create MVPs
- Goal is to train students on how to use tools and then allow them to build personal projects

##Functional Goals of the Final Product
1. Build a check-in system to monitor and manage tool usage
2. Create a well documented and maintainable system to make it easier for people to make changes to the codebase
3. Deploy locally to machine being used in the makerspace

##Goals of this Applications
1. Understand the demographics of students using the makerspace (year, major, school, frequency, etc.)
2. Pinpoint what tools are and are not being used by people who come to the makerspace
3. Create a way for makerspace mentors to know what tools students are and aren’t allowed to use


##Running the app
First, make sure you have Python 2.7 installed. 

#####Backend
Details for starting the backend can be found under the `makerspace_backend` directory. The README includes a full explanation of how to starts the server and run tests for this application.

##Endpoints
- /v1/users (`GET`, `POST`)
- /v1/user/<string:id> (`GET`, `PATCH`)
- /v1/equipment (`GET`, `POST`)
- /v1/equipment/<string:id> (`GET`)
- /v1/certifications (`GET`, `POST`)
- /v1/user (`POST`)

##Technologies

- React.js
- Flask
- MongoDB
- venv

##Challenges
- Envisioning usage given lack of understanding of makerspace attendance
- Working with unfamiliar technologies


##Authors
Joseph Stahl, Juan Hoyos, Brittany Roth, Harrison Stall