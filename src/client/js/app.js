/* Global Variables */
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
const Geonames = "http://api.geonames.org/searchJSON?q=";
const geo_username = "mohamed7178";

const weatherUrl = "https://api.weatherbit.io/v2.0/forecast/daily?";
const weatherbit = "70d698f43e92423683bd03def9e96f4c";

const pixBay = "https://pixabay.com/api/?key=";
const pixKey = "16368162-0222e30f5d077d5767c740d55";

const results = document.querySelector(".results");
const form = document.querySelector("#form");
const resetBtn = document.querySelector(".reset");

//wait till the document is loaded, for testing purposes
document.addEventListener("DOMContentLoaded", function () {
  resetBtn.addEventListener("click", reset);
  form.addEventListener("submit", formHandler);
});

//reset button
export function reset(event) {
  event.preventDefault();
  window.location.reload();
}

//main function
export function formHandler(event) {
  event.preventDefault();
  const cityDeparture = document.querySelector("#tripFrom").value;
  console.log(cityDeparture);
  const location = document.querySelector("#trip-location").value;
  const date = document.querySelector("#trip-date").value;
  const timestamp = new Date(date).getTime() / 1000;
  const timestampNow = Date.now() / 1000;
  getgeo(Geonames, location, geo_username)
    .then((Data) => {
      const cityLat = Data.geonames[0].lat;
      const cityLong = Data.geonames[0].lng;
      const country = Data.geonames[0].countryName;
      const weatherData = weatherb(
        weatherUrl,
        cityLat,
        cityLong,
        country,
        weatherbit
      );
      return weatherData;
    })
    .then((weatherData) => {
      const daysLeft = Math.round((timestamp - timestampNow) / 86400);
      return postData("http://localhost:2001/travel", {
        fromCity: cityDeparture,
        toCity: location,
        travel_date: date,
        weather: weatherData,
        daysLeftTrip: daysLeft,
      });
    })
    .then((userData) => {
      updateUI(userData);
    });
}

//get the lat and long of the city
export const getgeo = async (url, city, username) => {
  const response = await fetch(
    url + city + "&maxRows=10&" + "username=" + username
  );
  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("ERROR", error);
  }
};
//get the weather of the city
export const weatherb = async (Url, lat, long, country, key) => {
  const response = await fetch(
    Url + "lat=" + lat + "&" + "lon=" + long + "&days=16&key=" + key
  );
  try {
    const data = response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("ERROR", error);
  }
};
//send the data to the backend server for packing and get it back
export const postData = async (Url = "", data = {}) => {
  const response = await fetch(Url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const userData = await response.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.log("ERROR", error);
  }
};

//fetch pixbay, set the UI for the user
export const updateUI = async (data) => {
  results.classList.remove("invisible");
  results.scrollIntoView({ behavior: "smooth" });
  console.log(data.fromCity, data.weather);
  const response = await fetch(
    pixBay + pixKey + "&q=" + data.toCity + "+city&image_type=photo"
  );

  try {
    const image = await response.json();
    console.log(image);
    document
      .querySelector("#pixbayPic")
      .setAttribute("src", image.hits[0].webformatURL);
    document.querySelector("#cityFrom").innerHTML = data.fromCity;
    document.querySelector("#cityTo").innerHTML = data.toCity;
    document.querySelector("#travelDate").innerHTML = data.daysLeft + " days";

    if (data.daysLeft < 16) {
      document.querySelector("#expectedWeather").innerHTML =
        data.weather.data[data.daysLeft].temp + "°C";
    } else {
      document.querySelector("#expectedWeather").innerHTML =
        data.weather.data[8].temp + "°C";
    }
  } catch (error) {
    console.log("ERROR", error);
  }
};
