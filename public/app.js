


// Initialize the map in the 'map' div
const map = L.map('map').setView([10.775, 106.7], 13); // Default view
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// // Create a layer group to hold markers for easy clearing
let resultsLayer = L.featureGroup().addTo(map);

const submitbutton = document.getElementById('submit-button');
submitbutton.addEventListener('click', function(e) {
    e.preventDefault();
    const lat = document.getElementById('lat').value;
    const lng = document.getElementById('lng').value;
    const radiusKm = document.getElementById('radiusKm').value;
    const name = document.getElementById('name').value;
    const serviceType = document.getElementById('serviceType').value;
    const payload = {
        lat: lat,
        lng: lng,
        radiusKm: radiusKm,
        name: name,
        serviceType: serviceType
    };
    console.log(payload);
    searchStores(payload);
}); 

async function searchStores(payload) {  
    const params = new URLSearchParams();
    if (payload.lat && payload.lng) {
        params.set('lat', payload.lat);
        params.set('lng', payload.lng);
        if (payload.radiusKm) params.set('radiusKm', payload.radiusKm);
    }
    if (payload.name) params.set('name', payload.name);
    if (payload.serviceType) params.set('serviceType', payload.serviceType);
    const response = await fetch(`/api/stores/search?${params.toString()}`)
   const data=await response.json();
   console.log(data);
   printresults(data);

}

function printresults(data) {
    console.log("logging data", data);

    const list = document.getElementById('result-list');
    
    // Clear previous results from both list and map
    list.innerHTML = '';
    resultsLayer.clearLayers();

    if (!data || data.length === 0) {
        list.innerHTML = '<li class="result-item">No stores found.</li>';
        return;
    }

    // Populate list and add markers for each store
    data.forEach((store) => {
        // Add to list
        const li = document.createElement('li');
        li.className = 'result-item';
        li.innerHTML = `<strong>${store.name}</strong><br>${store.serviceType}<br><small>${(store.distanceMeters/1000).toFixed(2)} km away</small>`;
        list.appendChild(li);

        // Add marker to map
        const marker = L.marker([store.latitude, store.longitude])
            .bindPopup(`<strong>${store.name}</strong>`);
        resultsLayer.addLayer(marker);

        // Optional: Pan to marker on list item click
        li.addEventListener('click', () => {
            map.setView([store.latitude, store.longitude], 15);
            marker.openPopup();
        });
    });

    // Adjust map view to fit all markers
    if (resultsLayer.getLayers().length > 0) {
        map.fitBounds(resultsLayer.getBounds(), { padding: [50, 50] });
    }
}