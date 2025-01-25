function addFlight() {
  let userInput = document.getElementById("user-input").value;
  //   console.log("hello");
  fetch("http://127.0.0.1:5000/addFlight/" + userInput)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);

      displayFlights();
    });
}

function displayFlights() {
  fetch("http://127.0.0.1:5000/getFlights")
    .then((response) => response.json())
    .then((response) => {
      //   console.log(response);
      document.getElementById("display").innerHTML = JSON.stringify(response);
    });
}
