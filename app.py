from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import socket
from urllib.parse import urlencode
import json
from Business import Business
import re

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

@app.route("/getAllBusinesses")
def getAllBusinesses():
    return jsonify(businesses)

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
    # data = request.get_json()
    data = request.form.to_dict()
    print(data, business_count, businesses)
    
    # business_to_add = Business(
    #     name=data["name"],
    #     owner_name=data["owner_name"],
    #     description=data["description"],
    #     category=data["category"],
    #     address=data["address"],
    #     phone=data.get("phone", ""),
    #     website=data.get("website", ""),
    #     social_media_links=data.get("social_media_links", "").split(","),
    #     opening_hours=data.get("opening_hours", "")
    # )
    # businesses.append(business_to_add)
    # business_count += 1
    return jsonify({"success": True, "new-business": data})


# @app.route("/passbackBusinessData", methods = ['POST'])
# def filterByBusinessStatus():
#     current_businesses = dict() # replace with filter by search query
#     filtered_businesses = dict()
    # for business in current_businesses:

    

@app.route("/searchBusinesses/<search_query>")
def searchBusinesses(search_query):
    pattern = re.compile(re.escape(search_query), re.IGNORECASE)

    results = []

    for business_id, business in businesses.items():
        if pattern.search(business.description()):
            results.append(business)

    return results




if __name__ == "__main__":
    app.run()