const search = document.querySelector(".search");
const alerta = document.querySelector(".alert");

function showItems(json) {
    document.querySelector(".weather").classList.add('show');
    
    document.querySelector(".tittle").textContent = `${json.name}, ${json.sys.country}`;
    document.querySelector(".temp-value").innerHTML = `${json.main.temp} <sup>ºC</sup>`;
    document.querySelector(".temp-description").textContent = json.weather[0].description;
    document.querySelector(".temp-max").innerHTML = `${json.main.temp_max} <sup>ºC</sup>`;
    document.querySelector(".temp-min").innerHTML = `${json.main.temp_min} <sup>ºC</sup>`;
    document.querySelector(".humidity").textContent = `${json.main.humidity}%`;
    document.querySelector(".wind").textContent = `${json.wind.speed} Km/h`;
    document.querySelector(".temp-img").src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
}

function ShowAlert() {
    document.querySelector(".weather").classList.remove('show');
    alerta.innerHTML = '<strong>Erro: </strong> Por favor, insira o nome da cidade';
}

function coderror() {
    alerta.innerHTML = '<strong>Erro: </strong> Não foi possível encontrar a cidade';
}

search.addEventListener("submit", async function(event) {
    event.preventDefault();

    const cityName = document.querySelector(".city-name");
    const CityNameValue = cityName.value.trim();

    if (CityNameValue === '') {
        ShowAlert();
        return;
    }

    const Key = '6ec4b5e46e5fc2a8e54e202b8d09fd72';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(CityNameValue)}&appid=${Key}&units=metric&lang=pt_br`;

    try {
        const response = await fetch(apiUrl);
        const json = await response.json();

        if (response.ok) {
            showItems(json);
            alerta.innerHTML = '';
            alerta.innerHTML = '';
        } else {
            document.querySelector(".weather").classList.remove('show');
            coderror();
        }
    } catch (error) {
        coderror();
    }
});
