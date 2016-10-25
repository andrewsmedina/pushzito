from flask import Flask, render_template
from flask.ext.pymongo import PyMongo
from flask_socketio import SocketIO


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
mongo = PyMongo(app)
socketio = SocketIO(app)


@app.route("/")
def index():
    users = mongo.db.users.find()
    return render_template('index.html', users=users)


if __name__ == "__main__":
    socketio.run(app)
