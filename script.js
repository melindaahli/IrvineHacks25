HOST = "http://127.0.0.1:5000"

function doImmediately() {
  alert('welcome!')
  $(".search-screen").hide();
  addBusinessCards()
}

async function addBusinessCards() {
  try {
    // Wait for the businesses data to be fetched
    console.log('trying to get businesses...')
    const businesses = await getAllBusinesses();

    // Loop through the dictionary using Object.entries()
    console.log('businesses', businesses)
    length_of_dict = Object.keys(businesses).length
    console.log(businesses_length, length_of_dict)

    for (let i = 0; i < length_of_dict; i++) {
      business = businesses[String(i)]
      business_name = business.name
      operation_status = business.status
      rating = business.rating
      category = business.category
      distance = '0'

      // Append a new business card to the container
      $('.search-result-container').append(
        `<div class="result-box" onclick="showBusinessPage(${business.id})">
          <div class="img-placeholder"></div>
          <div class="info-section">
            <h2 class="business-name">${business_name}</h2>
            <p class="status-rating">
              ${operation_status} &bull; <span class="star">&#9733; ${rating}</span>
            </p>
            <p class="category-distance">
              ${category} &bull; ${distance} miles
            </p>
          </div>
        </div>`
      );
    }
  } catch (error) {
    console.error("Error fetching businesses:", error);
  }
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
      return data.result; // Return the fetched data
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
