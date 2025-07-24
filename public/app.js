


// Initialize the map in the 'map' div
document.addEventListener('DOMContentLoaded', () => {
    // --- GLOBALS ---
    let favouriteStoreIds = new Set();
    let favouriteIdMap = new Map(); // Maps storeId -> favouriteId
    let currentSearchResults = [];

    // --- MAP INITIALIZATION ---
    const map = L.map('map').setView([10.775, 106.7], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    let resultsLayer = L.featureGroup().addTo(map);

    // --- DOM ELEMENTS ---
    const submitButton = document.getElementById('submit-button');
    const resultList = document.getElementById('result-list');
    const favouritesList = document.getElementById('favourites-list');

    // --- API FUNCTIONS ---
    async function searchStoresAPI(payload) {
        const params = new URLSearchParams();
        if (payload.lat && payload.lng) {
            params.set('lat', payload.lat);
            params.set('lng', payload.lng);
            if (payload.radiusKm) params.set('radiusKm', payload.radiusKm);
        }
        if (payload.name) params.set('name', payload.name);
        if (payload.serviceType) params.set('serviceType', payload.serviceType);
        
        const response = await fetch(`/api/stores/search?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to search stores');
        currentSearchResults = await response.json();
        printSearchResults(currentSearchResults);
    }

    async function fetchFavouritesAPI() {
        const response = await fetch('/api/favourites');
        if (!response.ok) throw new Error('Failed to fetch favourites');
        return await response.json();
    }

    async function addFavouriteAPI(storeId) {
        const response = await fetch('/api/favourites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ storeId }),
        });
        if (!response.ok) throw new Error('Failed to add favourite');
        return await response.json();
    }

    async function removeFavouriteAPI(favouriteId) {
        const response = await fetch(`/api/favourites/${favouriteId}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to remove favourite');
    }

    // --- LOGIC FUNCTIONS ---
    async function initializeFavourites() {
        try {
            const favourites = await fetchFavouritesAPI();
            favouriteStoreIds.clear();
            favouriteIdMap.clear();
            favourites.forEach(fav => {
                favouriteStoreIds.add(fav.store.id);
                favouriteIdMap.set(fav.store.id, fav.id);
            });
            printFavouritesList(favourites);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    async function toggleFavourite(storeId) {
        const isFavourite = favouriteStoreIds.has(storeId);
        try {
            if (isFavourite) {
                const favouriteId = favouriteIdMap.get(storeId);
                await removeFavouriteAPI(favouriteId);
            } else {
                await addFavouriteAPI(storeId);
            }
            // Refresh everything
            await initializeFavourites();
            printSearchResults(currentSearchResults); // Re-print search results to update hearts
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    // --- UI RENDERING FUNCTIONS ---
    function printSearchResults(stores) {
        resultList.innerHTML = '';
        resultsLayer.clearLayers();

        if (!stores || stores.length === 0) {
            resultList.innerHTML = '<li class="result-item">No stores found.</li>';
            return;
        }

        stores.forEach(store => {
            const isFavourite = favouriteStoreIds.has(store.id);
            const iconClass = isFavourite ? 'fas fa-heart' : 'far fa-heart';

            const li = document.createElement('li');
            li.className = 'result-item';
            li.innerHTML = `
                <div>
                    <strong>${store.name}</strong><br>
                    ${store.serviceType}<br>
                    <small>${(store.distanceMeters / 1000).toFixed(2)} km away</small>
                </div>
                <i class="${iconClass} favourite-icon" title="Toggle Favourite"></i>
            `;

            li.querySelector('.favourite-icon').addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavourite(store.id);
            });

            resultList.appendChild(li);

            const marker = L.marker([store.latitude, store.longitude])
                .bindPopup(`<strong>${store.name}</strong>`);
            resultsLayer.addLayer(marker);

            li.addEventListener('click', () => {
                map.setView([store.latitude, store.longitude], 15);
                marker.openPopup();
            });
        });

        if (resultsLayer.getLayers().length > 0) {
            map.fitBounds(resultsLayer.getBounds(), { padding: [50, 50] });
        }
    }

    function printFavouritesList(favourites) {
        favouritesList.innerHTML = '';
        if (!favourites || favourites.length === 0) {
            favouritesList.innerHTML = '<li>No favourites yet.</li>';
            return;
        }

        favourites.forEach(fav => {
            const li = document.createElement('li');
            li.className = 'favourite-item';
            li.innerHTML = `
                <span>${fav.store.name}</span>
                <i class="fas fa-heart favourite-icon" title="Remove Favourite"></i>
            `;
            li.querySelector('.favourite-icon').addEventListener('click', () => {
                toggleFavourite(fav.store.id);
            });
            favouritesList.appendChild(li);
        });
    }

    // --- EVENT LISTENERS & INITIALIZATION ---
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        const payload = {
            lat: document.getElementById('lat').value,
            lng: document.getElementById('lng').value,
            radiusKm: document.getElementById('radiusKm').value,
            name: document.getElementById('name').value,
            serviceType: document.getElementById('serviceType').value
        };
        searchStoresAPI(payload).catch(err => {
            console.error(err);
            alert(err.message);
        });
    });

    initializeFavourites();
});