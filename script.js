document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://vehiclehub-server.onrender.com";
  const vehicleList = document.getElementById("vehicleList");
  const fetchVehiclesButton = document.getElementById("fetchVehiclesButton");
  const allButton = document.getElementById("allButton");
  const availableButton = document.getElementById("availableButton");
  const inUseButton = document.getElementById("inUseButton");
  const addVehicleForm = document.getElementById("addVehicleForm");

  // Fetch and display vehicles
  async function fetchVehicles(filter = "") {
    try {
        let url = API_URL;
        if (filter) {
            url += `?status=${filter}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch vehicles: ${response.statusText}`);
        }
        const vehicles = await response.json();
        console.log("Fetched Vehicles:", vehicles); 
        displayVehicles(vehicles);
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        alert("Failed to fetch vehicles. Please check if the server is running.");
    }
}


function displayVehicles(vehicles) {
    vehicleList.innerHTML = ""; 
    if (vehicles.length === 0) {
        vehicleList.innerHTML = "<p>No vehicles found.</p>";
        return;
    }

    vehicles.forEach(vehicle => {
        const vehicleItem = document.createElement("li");
        vehicleItem.innerHTML = `
            <strong>${vehicle.MakeName}</strong> - 
            Vehicle Type: ${vehicle.VehicleTypeName}
        `;
        vehicleList.appendChild(vehicleItem);
    });
}

  async function addVehicle(event) {
      event.preventDefault();
      
      const make = document.getElementById("make").value;
      const model = document.getElementById("model").value;
      const status = document.getElementById("status").value;
      const licensePlate = document.getElementById("licensePlate").value;
  
      if (!make || !model || !status || !licensePlate) {
          alert("Please fill in all fields.");
          return;
      }
  
      const newVehicle = {
          MakeId: Date.now(),
          MakeName: make.toUpperCase(), 
          VehicleTypeId: Math.floor(Math.random() * 100), 
          VehicleTypeName: model,
          status: status.toLowerCase(),
          licensePlate: licensePlate.toUpperCase()
      };
  
      try {
          const response = await fetch(API_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newVehicle)
          });
  
          if (!response.ok) {
              throw new Error(`Failed to add vehicle: ${response.statusText}`);
          }
  
          alert("Vehicle added successfully!");
          fetchVehicles(); 
          document.getElementById("addVehicleForm").reset();
      } catch (error) {
          console.error("Error adding vehicle:", error);
          alert("Failed to add vehicle. Please check the server.");
      }
  }
  

  fetchVehiclesButton.addEventListener("click", () => fetchVehicles());
  allButton.addEventListener("click", () => fetchVehicles());
  availableButton.addEventListener("click", () => fetchVehicles("available"));
  inUseButton.addEventListener("click", () => fetchVehicles("in use"));
  addVehicleForm.addEventListener("submit", addVehicle);

  fetchVehicles();
});