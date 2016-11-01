from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Requests will be made here."

@app.route("/api/")
def hit_api():
    return "You've hit the makerspace API!"

@app.route("/api/users/")
def get_users():
    return "Get users request made."

@app.route("/api/equipment/")
def get_equipment():
    return "Get equipment request made"

if __name__ == "__main__":
    app.run()

