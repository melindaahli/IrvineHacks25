from flask import Flask, jsonify
from flask_cors import CORS
import requests
import socket
from urllib.parse import urlencode
import json

app = Flask(__name__)
CORS(app)

flights = []

# server is hosted
@app.route("/")
def hello_world():
    print("this function was called")
    crazy_computation = 2 + 2 / 2 + 4
    return jsonify({"result": crazy_computation})


@app.route("/getFlights")
def getflights():
    return jsonify(flights)


@app.route("/addFlight/<flightName>")
def addFlight(flightName):
    flights.append(flightName)
    return jsonify({"success": True})

@app.route("/locationFromIP")
def addressDetails():
    IPaddr = socket.gethostbyname(socket.gethostname())
    params = {
        't': 'string',
        'id': 'HdFEJUSenz3zrHtn6qRuDq**nSAcwXpxhQ0PC2lXxuDAZ-**',
        'ip': IPaddr,
        'cols': 'grpdomaininfo'
    }
    url = 'https://globalip.melissadata.net/v4/web/iplocation/doiplocation?' + urlencode(params)

    try:
        with requests.get(url, params = params) as response:
            if response.status_code == 200:
                data = response.json()
                latitude = data['Records'][0]['Latitude']
                longitude = data['Records'][0]['Longitude']
                return jsonify({'Latitude': latitude, 'Longitude': longitude })
            else:
                return jsonify({"error": "Failed to fetch data"})
            
    except requests.exceptions.RequestException as e:
        return jsonify({"error": url + str(e)})

if __name__ == "__main__":
    app.run()