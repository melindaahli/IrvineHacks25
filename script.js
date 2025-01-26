HOST = "http://127.0.0.1:5000"

function doImmediately() {
  $(".search-screen").hide();
}


function addFlight() {
  let userInput = document.getElementById("user-input").value;
  //   console.log("hello");
  fetch(HOST + "/addFlight/" + userInput)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);

      displayFlights();
    });
}

function displayFlights() {
  fetch(HOST + "/getFlights")
    .then((response) => response.json())
    .then((response) => {
      //   console.log(response);
      document.getElementById("display").innerHTML = JSON.stringify(response);
    });
}

function getAllBusinesses() {
  return fetch(HOST + "/getAllBusinesses")
    .then((response) => response.json()) // Parse JSON
    .then((data) => {
      console.log(data);
      return data; // Return the fetched data
    })
    .catch((error) => console.error("Error:", error));
}

// async function fetchBusinessData() {
//   try {
//     const businesses = await getAllBusinesses();  // Waits for the Promise to resolve
//     console.log(businesses);  // Now you can use the fetched data
//     return businesses;
//   } catch (error) {
//     console.error("Error fetching businesses:", error);
//   }
// }

// fetchBusinessData().then(businesses => {
//   $( ".search-result-container" ).append( "<p>business#</p>" );
// });

function onSearchBtnClicked(){
  $(".home-screen").hide();
  $(".search-screen").show();

}


function addBusiness() {
  const formData = new FormData();
  formData.append('name', document.getElementById("name").value);
  formData.append('owner_name', document.getElementById("owner_name").value);
  formData.append('description', document.getElementById("description").value)
  formData.append('category', document.getElementById("category").value)
  formData.append('address', document.getElementById("address").value)
  formData.append('phone', document.getElementById("phone").value)
  formData.append('website', document.getElementById("website").value)
  formData.append('social_media_links', document.getElementById("social_media_links").value)
  formData.append('opening_hours', document.getElementById("opening_hours").value)

  fetch(HOST + '/submitBusinessData', {
    method: 'POST',
    body: formData
  })
}

function displayLocation() {
  fetch(WEB_INTERFACE + "/locationFromIP")
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      document.getElementById("display2").innerHTML = JSON.stringify(response);
    });
}

function display() {
  fetch(HOST + "/getFlights")
    .then((response) => response.json())
    .then((response) => {
      //   console.log(response);
      document.getElementById("display").innerHTML = JSON.stringify(response);
    });
}

function search() {
  query = document.getElementById("user-input").value
  encoded_query = encodeURIComponent(query);
  
  fetch(HOST + "/searchBusinesses/" + encoded_query)
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      document.getElementById("display").innerHTML = JSON.stringify(response);
    });
}
