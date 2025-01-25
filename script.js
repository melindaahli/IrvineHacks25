WEB_INTERFACE = "http://127.0.0.1:5000"

function addFlight() {
  let userInput = document.getElementById("user-input").value;
  //   console.log("hello");
  fetch(WEB_INTERFACE + "/addFlight/" + userInput)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);

      displayFlights();
    });
}

function displayFlights() {
  fetch(WEB_INTERFACE + "/getFlights")
    .then((response) => response.json())
    .then((response) => {
      //   console.log(response);
      document.getElementById("display").innerHTML = JSON.stringify(response);
    });
}
