from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import socket
from urllib.parse import urlencode, unquote
import json
from Business import Business
import sample_businesses
import re
import random
import math


app = Flask(__name__)
CORS(app)

# Radius of Earth in kilometers
EARTH_RADIUS_KM = 6371.0

flights = []
businesses = sample_businesses.businesses
business_search_results = dict()
business_count = len(businesses)

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
    return jsonify({key: value.__dict__ for key, value in businesses.items()})

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
    
    data = request.form.to_dict()
    # print(data, business_count, businesses)

    random_coords = generate_random_location(33.649363, -117.842565, 5)
    
    business_to_add = Business(
        name=data["name"],
        owner_name=data["owner_name"],
        description=data["description"],
        category=data["category"],
        address=data["address"], 
        latitude=random_coords[0],
        longitude=random_coords[1],
        phone=data.get("phone", ""),
        website=data.get("website", ""),
        social_media_links=data.get("social_media_links", "").split(","),
        opening_hours=data.get("opening_hours", "")
    )

    business_count += 1
    businesses[f'{business_count}'] = business_to_add

    print(businesses, business_count, len(businesses))

    return jsonify({"success": True, "new-business": data})



# Function to generate random coordinates within a given radius
def generate_random_location(lat, lon, radius_km):
    # Convert latitude and longitude from degrees to radians
    lat_rad = math.radians(lat)
    lon_rad = math.radians(lon)

    # Generate a random distance and angle
    random_distance = random.uniform(0, radius_km)  # random distance in km
    random_angle = random.uniform(0, 2 * math.pi)  # random angle in radians

    # Calculate the new latitude and longitude in radians
    new_lat_rad = lat_rad + (random_distance / EARTH_RADIUS_KM)
    new_lon_rad = lon_rad + (random_distance / EARTH_RADIUS_KM) / math.cos(lat_rad)

    # Convert the new coordinates back to degrees
    new_lat = math.degrees(new_lat_rad)
    new_lon = math.degrees(new_lon_rad)

    # Make sure the generated latitude and longitude are within valid ranges
    if new_lat > 90:
        new_lat = 90
    if new_lat < -90:
        new_lat = -90

    if new_lon > 180:
        new_lon = 180
    if new_lon < -180:
        new_lon = -180

    return new_lat, new_lon


# @app.route("/passbackBusinessData", methods = ['POST'])
# def filterByBusinessStatus():
#     current_businesses = dict() # replace with filter by search query
#     filtered_businesses = dict()
    # for business in current_businesses:


@app.route("/searchBusinesses/<search_query>")
def searchBusinesses(search_query):
    search_query = unquote(search_query)
    words = search_query.split()
    pattern = re.compile(r'|'.join([re.escape(word) for word in words]), re.IGNORECASE)

    results = []

    for business_id, business in businesses.items():
        if pattern.search(business.description):
            results.append(business_id)

    return jsonify({'results': results})

@app.route("/distanceFinder/<search_query>")
def getMileDistance(search_query):
    search_query = unquote(search_query)
    lat1 = math.radians(search_query[0])
    lat2 = math.radians(search_query[1])
    lon1 = math.radians(search_query[2])
    lon2 = math.radians(search_query[3])

    delta_lat = abs(lat2 - lat1)
    delta_lon = abs(lon2 - lon1)

    a = math.sin(delta_lat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(delta_lon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    # Earth's radius in miles
    R = 3959

    # Calculate the distance
    distance = R * c

    return jsonify({'distance': distance})

if __name__ == "__main__":
    app.run()