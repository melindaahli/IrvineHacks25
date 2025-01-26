WEB_INTERFACE = "http://127.0.0.1:5000"

document.addEventListener('DOMContentLoaded', () => {
    getCoords() // Safely call getCoords after the DOM is loaded
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

    var ourMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })

    ourMap.addTo(map);
    
    displayUserMarker(latitude, longitude, map)
}


function displayUserMarker(latitude, longitude, map) {
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup(); 
}


