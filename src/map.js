WEB_INTERFACE = "http://127.0.0.1:5000"

document.addEventListener('DOMContentLoaded', () => {
    const jsonCoords = getCoords(); // Safely call getCoords after the DOM is loaded
    var latitude = jsonCoords.Latitude
    var longitude = jsonCoords.Longitude
    displayMap(latitude, longitude)  // might have problem if no return value from python flask file -> try and catch fix later
  });


function getCoords() {
    fetch(WEB_INTERFACE + "/locationFromIP")
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
    });
}

function displayMap(latitude, longitude) {
    var map = L.map('map').setView([latitude, longitude], 13);

    var ourMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })

    ourMap.addTo(map);

}

/*L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup(); */
