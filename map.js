const WEB_INTERFACE = "http://127.0.0.1:5000"; // Define the base URL for your web interface

var map; // Declare map in the global scope

document.addEventListener("DOMContentLoaded", () => {
  getCoords(); // Safely call getCoords after the DOM is loaded
  // getAllBusinesses();
});

function getCoords() {
  fetch(WEB_INTERFACE + "/locationFromIP")
    .then((response) => response.json())
    .then((response) => {
      var latitude = response.Latitude;
      var longitude = response.Longitude;
      displayMap(latitude, longitude);

      // Call getAllBusinesses only after map is created
      getAllBusinesses();
    })
    .catch((error) => {
      console.error("Error fetching coordinates:", error);
    });
}

function displayMap(latitude, longitude) {
  map = L.map("map").setView([latitude, longitude], 13);
  var googleStreets = L.tileLayer(
    "http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}",
    {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }
  );
  googleStreets.addTo(map);
}

function getAllBusinesses() {
  fetch(WEB_INTERFACE + "/getAllBusinesses")
    .then((response) => response.json())
    .then((data) => {
      Object.values(data).forEach((business) => {
        L.marker([business.latitude, business.longitude])
          .addTo(map)
          .bindPopup(business.name);
          console.log(business);
      });
    })
    .catch((error) => {
      console.error("Error fetching businesses:", error);
    });
}
