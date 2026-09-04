const getWeatherBtn = document.getElementById("get-weather-btn");
const selectCity = document.getElementById("select-city");

function formatTemperature(value) {
    return `${Math.round(Number(value ?? 0))}°C`;
}

function formatSpeed(value) {
    return `${Number(value ?? 0).toFixed(1)} m/s`;
}

function setWeatherIcon(iconCode) {
    const weatherIcon = document.getElementById("weather-icon");
    const icon = iconCode ?? "";

    if (!icon) {
        weatherIcon.src = "";
        return;
    }

    weatherIcon.src = icon.startsWith("http") ? icon : `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

function setWeatherBackground(condition) {
    const body = document.body;
    const display = document.getElementById("display");
    const weatherClasses = [
        "weather-clear",
        "weather-clouds",
        "weather-rain",
        "weather-snow",
        "weather-thunderstorm",
        "weather-default",
    ];

    [body, display, selectCity, getWeatherBtn].forEach((el) => {
        el.classList.remove(...weatherClasses);
    });

    const map = {
        Clear: "weather-clear",
        Clouds: "weather-clouds",
        Rain: "weather-rain",
        Snow: "weather-snow",
        Thunderstorm: "weather-thunderstorm",
    };

    const className = map[condition] ?? "weather-default";
    body.classList.add(className);
    display.classList.add(className);
    selectCity.classList.add(className);
    getWeatherBtn.classList.add(className);
}

async function getWeather(city) {
    try {
        const res = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

async function showWeather(city) {
    const data = await getWeather(city);

    if (!data) {
        alert("Something went wrong, please try again later");
        return;
    }

    const weatherSummary = data.weather?.[0]?.main ?? "N/A";
    const feelsLike = data.main?.feels_like ?? 0;

    setWeatherIcon(data.weather?.[0]?.icon ?? "");
    document.getElementById("location").textContent = `${data.name ?? "N/A"}${data.sys?.country ? `, ${data.sys.country}` : ""}`;
    document.getElementById("main-temperature").textContent = formatTemperature(data.main?.temp ?? 0);
    document.getElementById("feels-like").textContent = `Feels like ${formatTemperature(feelsLike)} • ${weatherSummary}`;
    document.getElementById("humidity").textContent = `${data.main?.humidity ?? 0}%`;
    document.getElementById("wind").textContent = formatSpeed(data.wind?.speed ?? 0);
    document.getElementById("wind-gust").textContent = formatSpeed(data.wind?.gust ?? 0);

    setWeatherBackground(data.weather?.[0]?.main);
}

async function handleGetWeather(city) {
    if (city === "") return;

    const display = document.getElementById("display");
    display.classList.remove("hidden");
    display.classList.remove("visible");
    void display.offsetWidth;
    display.classList.add("visible");

    getWeatherBtn.disabled = true;
    getWeatherBtn.textContent = "Loading...";

    await showWeather(city);

    getWeatherBtn.disabled = false;
    getWeatherBtn.textContent = "Get Weather";
}


getWeatherBtn.addEventListener("click", async () => {
    const selected = selectCity.value;
    await handleGetWeather(selected);
});

selectCity.addEventListener("change", async () => {
    const selected = selectCity.value;
    await handleGetWeather(selected);
});