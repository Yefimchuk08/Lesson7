const API_KEY = "https://api.openweathermap.org";

document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=en`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      const name = data.name;
      const temp = data.main.temp;
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;

      document.getElementById("weatherResult").innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${temp}°C</p>
        <p>Weather: ${description}</p>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
      `;
    })
    .catch(error => {
      document.getElementById("weatherResult").innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
});
