from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Requests will be made here."

@app.route("/api/")
def hit_api():
    return "You've hit the makerspace API!"

if __name__ == "__main__":
    app.run()

