from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import socket
from urllib.parse import urlencode
import json
from Business import Business

app = Flask(__name__)
CORS(app)

flights = []
businesses = dict()
business_count = 0

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
    
@app.route("/businessDetails/<businessID>")
def businessDetails(businessID):
    business = businesses['businessID']
    return jsonify({"name": business.name,
                    "owner_name": business.owner_name,
                    "description": business.description,
                    "category": business.category,
                    "address": business.address,
                    "rating": business.rating,
                    "review_count": business.review_count,
                    "phone": business.phone,
                    "website": business.website,
                    "social_media": business.social_media_links,
                    "opening_hours": business.opening_hours,
                    "images": business.images
                    })

@app.route("/submitBusinessData", methods = ['POST'])
def submitBusinessData():
    global business_count 
    global businesses
    items = request.form.to_dict()
    print(items, business_count, businesses)
    business_to_add = Business(items["name"],
                               items["owner_name"],
                               items["description"],
                               items["category"],
                               items["address"],
                               items["phone"],
                               items["website"],
                               items["social_media_links"],
                               items["opening_hours"])
    businesses[f"{business_count}"] = business_to_add
    business_count += 1
    return ""


if __name__ == "__main__":
    app.run()