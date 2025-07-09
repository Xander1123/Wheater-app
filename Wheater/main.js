const apiKey = "c542e39894953aaedd192fde40132e1e";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// DOM Elements
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const weatherCondition = document.getElementById("weather-condition");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const weatherIcon = document.getElementById("weather-icon");
const updateTimeDisplay = document.getElementById("update-time");
const currentTime = document.getElementById("current-time");
const currentDate = document.getElementById("current-date");

// Update time display (24-hour format)
function updateTime() {
  const now = new Date();

  // 24-hour time format (HH:MM)
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}`;

  // Date format (YYYY-MM-DD)
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const dateString = `${year}-${month}-${day}`;

  currentTime.textContent = timeString;
  currentDate.textContent = dateString;
  updateTimeDisplay.textContent = timeString;
}

// Get weather data
async function getWeatherData(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    // Update weather data
    cityName.textContent = data.name;
    temperature.textContent = Math.round(data.main.temp) + "°C";
    weatherCondition.textContent = data.weather[0].main;
    humidity.textContent = data.main.humidity + "%";
    windSpeed.textContent = Math.round(data.wind.speed) + " km/h";

    // Update weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    // Update time
    updateTime();
  } catch (err) {
    console.error("Error fetching weather data:", err);
    alert("City not found. Please try again.");
  }
}

// Event listeners
searchBtn.addEventListener("click", () => {
  if (cityInput.value.trim() !== "") {
    getWeatherData(cityInput.value.trim());
  }
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && cityInput.value.trim() !== "") {
    getWeatherData(cityInput.value.trim());
  }
});

// Initialize with default city and time
getWeatherData("Baku");
updateTime();

// Update time every minute
setInterval(updateTime, 60000);
