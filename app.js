let input = document.querySelector(".search-box");
let city = document.querySelector(".location .city");
let date = document.querySelector(".location .date");
let temp = document.querySelector(".current .temp");
let weather_el = document.querySelector(".current .weather");
let feelsLike = document.querySelector(".feels-like");
let high = document.querySelector(".high");
let low = document.querySelector(".low");
let button = document.querySelector(".btn");
let errorMessage = document.querySelector(".error-message");

// Event listener on button
button.addEventListener("click", function (e) {
  getWeather(input.value);
  // Clear Input field
  input.value = "";
  e.preventDefault();
});

// Get Weather
async function getWeather(cityName) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=dcc979f75364219f5c17e28bc834cef4&units=metric`
    );
    if (!response.ok) {
      throw new Error(
        "Weather data not found. Please enter the correct city name."
      );
    }
    const weatherData = await response.json();
    errorMessage.textContent = ""; // Clear any previous error messages
    displayResults(weatherData);
    // Clear temperature details after 5 seconds
    setTimeout(clearTemperatureDetails, 5000);
  } catch (error) {
    showError(error.message);
    clearTemperatureDetails(); // Clear temperature details on error
    // Clear the error message after 5 seconds
    setTimeout(() => {
      errorMessage.textContent = "";
    }, 5000);
  }
}

// Show error message
function showError(message) {
  errorMessage.textContent = message;
}

// Show weather details
function displayResults(weatherData) {
  city.innerText = weatherData.name;
  let now = new Date();
  date.innerText = dateBuilder(now);
  temp.innerHTML = `${Math.round(weatherData.main.temp)}<span>°C</span>`;
  weather_el.innerText = weatherData.weather[0].main;
  feelsLike.innerText = `Feels_like: ${weatherData.main.feels_like}°C`;
  high.innerText = `Maximum_temperature: ${weatherData.main.temp_max}°C`;
  low.innerText = `Minimum_temperature: ${weatherData.main.temp_min}°C`;
}

// Clear temperature details
function clearTemperatureDetails() {
  city.innerText = "";
  date.innerText = "";
  weather_el.innerText = "";
  temp.innerHTML = "";
  feelsLike.innerText = "";
  high.innerText = "";
  low.innerText = "";
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}

const modeToggleCheckbox = document.getElementById("mode-toggle-checkbox");
const container = document.querySelector(".container");

modeToggleCheckbox.addEventListener("change", function () {
  if (modeToggleCheckbox.checked) {
    // Dark mode
    container.classList.add("dark-mode");
  } else {
    // Light mode
    container.classList.remove("dark-mode");
  }
});
