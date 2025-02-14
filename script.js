let map;
let geocoder;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 32.7767, lng: -96.7970 }, // Default center: Dallas, TX
        zoom: 10
    });

    geocoder = new google.maps.Geocoder(); // Initialize Geocoder
}

function openModal(shopName, address) {
    const modal = document.getElementById("info-modal");
    if (modal) {
        modal.style.display = "flex"; // Show the modal
        document.getElementById("modal-title").textContent = shopName + " Details";

        if (geocoder) {
            geocoder.geocode({ address: address }, function(results, status) {
                if (status === "OK") {
                    map.setCenter(results[0].geometry.location);
                    map.setZoom(15);
                    clearMarkers();
                    addMarker(results[0].geometry.location, shopName);
                }
            });
        }
    }
}

// Ensure the modal only opens when clicking a coffee shop
document.addEventListener("DOMContentLoaded", function() {
    const coffeeShopElements = document.querySelectorAll(".coffee-shop");
    coffeeShopElements.forEach(shop => {
        shop.addEventListener("click", function() {
            const shopName = this.querySelector(".coffee-shop-title").textContent;
            const address = this.querySelector("p:last-child").textContent;
            openModal(shopName, address);
        });
    });

    // Ensure modal doesn't auto-open on page load
const modal = document.getElementById("info-modal");
    if (modal) {
        modal.style.display = "none"; // Ensure it's always hidden on load
    }
    
    // Make logo clickable (redirects to landing.html)
    const logo = document.getElementById("logo");
    if (logo) {
        logo.style.cursor = "pointer";
        logo.addEventListener("click", function() {
            window.location.href = "landing.html";
        });
    }
});

// Function to add a marker to the map
let markers = [];

function addMarker(location, title) {
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: title
    });
    markers.push(marker);
}

// Function to clear existing markers
function clearMarkers() {
    for (let marker of markers) {
        marker.setMap(null);
    }
    markers = [];
}

// Close the modal
function closeModal() {
    document.getElementById("info-modal").style.display = "none";
}

// Landing Page Search Functionality
document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("landing-search-button");
    const cityInput = document.getElementById("landing-city-input");
    const coffeeShopInput = document.getElementById("landing-search-input");

    function isValidCity(city) {
        // Simple regex to allow letters and spaces only, ensuring it's not just random text
        return /^[a-zA-Z\s]+$/.test(city) && city.trim().length > 1;
    }

    function handleSearch() {
        const city = cityInput.value.trim();
        const coffeeShop = coffeeShopInput.value.trim().toLowerCase();

        // List of valid coffee shop names (from index.html)
        const validCoffeeShops = ["1418", "black rock coffee bar", "mudleaf"];

        if (city && !isValidCity(city)) {
            window.alert("City not found. Please enter a valid city name.");
            return;
        }

        if (city.toLowerCase() === "dallas" || validCoffeeShops.includes(coffeeShop)) {
            window.location.href = "index.html"; // Redirect to main page
        } else if (city) {
            // Redirect to error page with the city name in URL params
            window.location.href = `error.html?name=${encodeURIComponent(city)}`;
        } else if (coffeeShop) {
            // Redirect to error page with coffee shop name
            window.location.href = `error.html?name=${encodeURIComponent(coffeeShop)}`;
        }
    }

    if (searchButton) {
        searchButton.addEventListener("click", handleSearch);
    }

    [cityInput, coffeeShopInput].forEach(input => {
        if (input) {
            input.addEventListener("keypress", function(event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    handleSearch();
                }
            });
        }
    });
});
