WEB_INTERFACE = "http://127.0.0.1:5000"

document.addEventListener('DOMContentLoaded', () => {
    getCoords() // Safely call getCoords after the DOM is loaded
    getAllBusinesses()
  });


function getCoords() {
    fetch(WEB_INTERFACE + "/locationFromIP")
    .then((response) => response.json())
    .then((response) => {
        
    var latitude = response.Latitude
    var longitude = response.Longitude
    displayMap(latitude, longitude)  // might have problem if no return value from python flask file -> try and catch fix later
    });
}


function displayMap(latitude, longitude) {
    var map = L.map('map').setView([latitude, longitude], 13);

    googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    });

    googleStreets.addTo(map)
    
}

function getAllBusinesses() {
    return fetch(WEB_INTERFACE + "/getAllBusinesses")
      .then((response) => response.json()) // Parse JSON
      .then((data) => { 
        for (const value in Object.keys(data)) {
            L.marker(value['latitude'], value['longitude']).addTo(map)
                .bindPopup(value.name);
            };
      })
  }




