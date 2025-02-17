let map;
let geocoder;
<<<<<<< HEAD

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
=======
let markers = [];

// Initializes the Google Map and geocoder.
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 32.7767, lng: -96.7970 },
    zoom: 10
  });
  geocoder = new google.maps.Geocoder();
}

// Dark mode functions.
function enableDarkMode() {
  document.body.classList.add('dark-mode');
  localStorage.setItem('theme', 'dark');
}
function disableDarkMode() {
  document.body.classList.remove('dark-mode');
  localStorage.setItem('theme', 'light');
}
function detectColorScheme() {
  let theme = 'light';
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme = 'dark';
  }
  theme === 'dark' ? enableDarkMode() : disableDarkMode();
}

// Coffee shop popup functions.
function openPopup(shop) {
  document.getElementById("popup-title").textContent = shop.name;
  document.getElementById("popup-logo").src = shop.logo;
  document.getElementById("popup-description").textContent = shop.description;
  document.getElementById("popup-coffee").textContent = shop.reviews.coffee;
  document.getElementById("popup-price").textContent = shop.reviews.price;
  document.getElementById("popup-wifi").textContent = shop.reviews.wifi;
  document.getElementById("popup-service").textContent = shop.reviews.service;
  document.getElementById("popup-size").textContent = shop.reviews.size;
  document.getElementById("popup-ambiance").textContent = shop.reviews.ambiance;
  document.getElementById("popup-busyness").textContent = shop.reviews.busyness;
  document.getElementById("popup-loudness").textContent = shop.reviews.loudness;
  document.getElementById("popup-music").textContent = shop.reviews.music;
  document.getElementById("popup-wfh").textContent = shop.reviews.wfh;
  document.getElementById("popup-img1").src = shop.images[0];
  document.getElementById("popup-img2").src = shop.images[1];
  document.getElementById("popup-img3").src = shop.images[2];
  document.getElementById("popup-img4").src = shop.images[3];
  document.getElementById("popup-address").textContent = shop.address;
  document.getElementById("popup-hours").textContent = shop.hours;
  document.getElementById("popup-menu-items").innerHTML = shop.menu.map(item => `<li>${item}</li>`).join('');
  document.getElementById("coffee-shop-popup").classList.add("show");
}
function closePopup() {
  const panel = document.getElementById("coffee-shop-popup");
  panel.classList.remove("show");
  panel.classList.remove("expanded");
}
function toggleExpand() {
  const panel = document.getElementById("coffee-shop-popup");
  panel.classList.toggle("expanded");
}

// Marker functions.
function addMarker(location, title) {
  const marker = new google.maps.Marker({
    position: location,
    map: map,
    title: title
  });
  markers.push(marker);
}
function clearMarkers() {
  markers.forEach(marker => marker.setMap(null));
  markers = [];
}

// Other modal functions.
function openModal(shopName, address) {
  const modal = document.getElementById("info-modal");
  if (modal) {
    modal.style.display = "flex";
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
function closeModal() {
  const modal = document.getElementById("info-modal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Combined DOMContentLoaded event.
document.addEventListener("DOMContentLoaded", function() {
  // Set initial color scheme based on user preference or saved value.
  detectColorScheme();

  // Set up dark mode toggle button.
  let darkToggle = document.getElementById('dark-mode-toggle');
  if (!darkToggle) {
    darkToggle = document.createElement('button');
    darkToggle.id = 'dark-mode-toggle';
    darkToggle.style.position = 'fixed';
    darkToggle.style.top = '10px';
    darkToggle.style.right = '10px';
    darkToggle.style.background = 'transparent';
    darkToggle.style.border = 'none';
    darkToggle.style.fontSize = '24px';
    darkToggle.style.cursor = 'pointer';
    
    // Create icon spans.
    const moonSpan = document.createElement('span');
    moonSpan.className = 'cs-moon';
    moonSpan.textContent = '🌙';
    const sunSpan = document.createElement('span');
    sunSpan.className = 'cs-sun';
    sunSpan.textContent = '☀️';
    
    // Set initial visibility of icons.
    if (document.body.classList.contains('dark-mode')) {
      moonSpan.style.display = 'none';
      sunSpan.style.display = 'inline';
    } else {
      sunSpan.style.display = 'none';
      moonSpan.style.display = 'inline';
    }
    
    darkToggle.appendChild(moonSpan);
    darkToggle.appendChild(sunSpan);
    document.body.appendChild(darkToggle);
  }
  
  darkToggle.addEventListener('click', function() {
    if (document.body.classList.contains('dark-mode')) {
      disableDarkMode();
      darkToggle.querySelector('.cs-moon').style.display = 'inline';
      darkToggle.querySelector('.cs-sun').style.display = 'none';
    } else {
      enableDarkMode();
      darkToggle.querySelector('.cs-moon').style.display = 'none';
      darkToggle.querySelector('.cs-sun').style.display = 'inline';
    }
  });

  // Landing page search functionality.
  const searchButton = document.getElementById("landing-search-button");
  const cityInput = document.getElementById("landing-city-input");
  const coffeeShopInput = document.getElementById("landing-search-input");
  function isValidCity(city) {
    return /^[a-zA-Z\s]+$/.test(city) && city.trim().length > 1;
  }
  function handleSearch() {
    const city = cityInput.value.trim();
    const coffeeShop = coffeeShopInput.value.trim().toLowerCase();
    const validCoffeeShops = ["1418", "black rock coffee bar", "mudleaf"];
    if (city && !isValidCity(city)) {
      window.alert("City not found. Please enter a valid city name.");
      return;
    }
    if (city.toLowerCase() === "dallas" || validCoffeeShops.includes(coffeeShop)) {
      window.location.href = "index.html";
    } else if (city) {
      window.location.href = `error.html?name=${encodeURIComponent(city)}`;
    } else if (coffeeShop) {
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

  // Coffee shop click event listeners.
  const coffeeShopElements = document.querySelectorAll(".coffee-shop");
  coffeeShopElements.forEach(shop => {
    shop.addEventListener("click", function() {
      const shopName = this.querySelector(".coffee-shop-title").textContent;
      const address = this.querySelector("p:last-child").textContent;
      const logoSrc = this.querySelector("img").getAttribute("src");
      const shopData = {
        name: shopName,
        description: "Upbeat indie coffeehouse with plush couches & chairs offering espresso drinks, smoothies & pastries.",
        address: address,
        hours: "Mon-Fri: 7 AM - 10 PM, Sat-Sun: 8 AM - 11 PM",
        reviews: {
          coffee: "9/10",
          price: "$",
          wifi: "Good",
          service: "Excellent",
          size: "Medium",
          ambiance: "Cozy",
          busyness: "Moderate",
          loudness: "Quiet",
          music: "Jazz",
          wfh: "WFH Friendly"
        },
        images: [
          "1418images/image1.jpg",
          "1418images/image2.jpg",
          "1418images/image3.jpg",
          "1418images/image4.jpg"
        ],
        logo: logoSrc,
        menu: ["Espresso", "Latte", "Cappuccino", "Pastries"]
      };
      openPopup(shopData);
    });
  });
  
  // Landing page logo redirection.
  const landingLogo = document.getElementById("landing-logo");
  if (landingLogo) {
    landingLogo.style.cursor = "pointer";
    landingLogo.addEventListener("click", function() {
      window.location.href = "landing.html";
    });
  }
>>>>>>> 1eb31c6 (Add initial website files and updates)
});
