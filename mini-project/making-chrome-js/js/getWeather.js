const API_KEY = "241051bf13976dd3ddf8b8d9f247255e";
const weatherDiv = document.querySelector(".weather");

async function success(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=kr`;
  var coords = null;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => (coords = data));
  const {
    main: { feels_like, temp },
    name,
    weather
  } = coords;

  weatherDiv.innerText = `${weather[0].main} ${Math.round(
    temp
  )}ºc (${Math.round(feels_like)}ºc) @ ${name}`;
}

function error() {
  console.log("unable to get user location");
}

function init() {
  navigator.geolocation.getCurrentPosition(success, error);
}

init();
