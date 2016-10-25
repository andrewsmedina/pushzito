from flask import Flask, render_template
from flask.ext.pymongo import PyMongo


app = Flask(__name__)
mongo = PyMongo(app)


@app.route("/")
def index():
    users = mongo.db.users.find()
    return render_template('index.html', users=users)


if __name__ == "__main__":
    app.run()
