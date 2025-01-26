HOST = "http://127.0.0.1:5000"

function doImmediately() {
  alert('welcome!')
  $(".search-screen").hide();
}

async function getAllBusinesses() {
  return await fetch(HOST + "/getAllBusinesses")
    .then((response) => response.json()) 
}

async function addBusinessCards() {
  try {
    // Wait for the businesses data to be fetched
    console.log('trying to get businesses...')
    const businesses = await getAllBusinesses();

    console.log('businesses', businesses);

    let interested_businesses = await search();
    console.log('interested businesses', interested_businesses, typeof interested_businesses);
    let bus_id = 0;
    the_list = Object.values(interested_businesses)[0]


    // console.log(businesses_length, length_of_dict)
    Object.values(businesses).forEach((business) => {  
      console.log(bus_id);
      if (bus_id in the_list) {
        console.log('THIS IS A BUSINESSE', business)

        let business_name = business.name
        let operation_status = business.status
        let rating = business.rating
        let category = business.category
        let distance = '0'

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
      bus_id += 1
    });

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
  addBusinessCards()
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
      return response
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

// async function search() {
//   query = document.getElementById("user-input").value
//   encoded_query = encodeURIComponent(query);
  
//   fetch(HOST + "/searchBusinesses/" + encoded_query)
//     .then((response) => response.json())
//     .then((response) => {
//       console.log(response)
//       document.getElementById("display").innerHTML = JSON.stringify(response);
//       return JSON.stringify(response);
//     });
// }

async function search() {
  query = document.getElementById("user-input").value;
  encoded_query = encodeURIComponent(query);
  
  return await fetch(HOST + "/searchBusinesses/" + encoded_query)
    .then((response) => response.json()) 
}

function getDistance(to_lat, to_lon){
  curr_lat = displayLocation()['Latitude'];
  curr_lon = displayLocation()['Longitude'];

  query = "" + curr_lat + " " + curr_lon + " " + to_lat + " " + to_lon
  encoded_query = encodeURIComponent(query)

  fetch(HOST + "/getMileDistance/" + encoded_query)
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      document.getElementById("display").innerHTML = JSON.stringify(response);
    });
}
