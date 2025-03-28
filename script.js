// Define the API URL
const API_URL = 'http://localhost:3000/Vehicles'

// Get DOM elements
const fetchVehiclesButton = document.getElementById("fetchVehiclesButton");
const vehicleList = document.getElementById("vehicleList");

// Function to fetch and display vehicle data from the API
async function fetchVehicleData() {
  try {
    // Clear the existing list
    vehicleList.innerHTML = "";

    // Fetch data from the API
    const response = await fetch(API_URL);

    // Check if the API request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Check if there are results
    if (data.Results && data.Results.length > 0) {
      // Loop through the data and display each vehicle
      data.Results.forEach(vehicle => {
        const li = document.createElement("li");
        li.textContent = `Make: ${vehicle.MakeName}, Type: ${vehicle.VehicleTypeName}`;
        vehicleList.appendChild(li);
      });
    } else {
      // Display a message if no results are found
      const li = document.createElement("li");
      li.textContent = "No vehicles found for the make 'Merc'.";
      vehicleList.appendChild(li);
    }
  } catch (error) {
    // Handle any errors
    console.error("Error fetching vehicle data:", error);
    const li = document.createElement("li");
    li.textContent = "An error occurred while fetching vehicle data.";
    vehicleList.appendChild(li);
  }
}

// Add event listener to the button
fetchVehiclesButton.addEventListener("click", fetchVehicleData);




