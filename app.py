#################################################
# Import Dependencies
#################################################
import datetime as dt
import pandas as pd

from flask import Flask, render_template, jsonify

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################
@app.route("/")
def index():
    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)