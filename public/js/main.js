const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");

const temp_real_val = document.getElementById("temp_real_val");
const temp_status = document.getElementById("temp_status");

const datahide = document.querySelector(".middle_layer");

const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;

  if (cityVal === "") {
    city_name.innerText = `Plz write the name before you search`;
    datahide.classList.add("data_hide");
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=bcbd8817892bb68f0668699d622ebe8e`;
      const response = await fetch(url);
      const data = await response.json();
      const arrData = [data];

      city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
      temp_real_val.innerText = `${(arrData[0].main.temp - 273.15).toFixed(2)}`;
      const tempMood = `${arrData[0].weather[0].main}`;

      if (tempMood == "Sunny") {
        temp_status.innerHTML =
          "<i class='fa fa-sun aria-hidden='true' style='color: #eccc68'></i>";
      } else if (tempMood == "Clouds") {
        temp_status.innerHTML =
          "<i class='fa fa-cloud aria-hidden='true' style='color: #dfe4ea'></i>";
      } else if (tempMood == "Rainy") {
        temp_status.innerHTML =
          "<i class='fa fa-cloud-rain aria-hidden='true' style='color: #a4b0be'></i>";
      } else {
        temp_status.innerHTML =
          "<i class='fa fa-sun aria-hidden='true' style='color: #eccc68'></i>";
      }
      datahide.classList.remove("data_hide");
    } catch {
      city_name.innerText = `Plz enter a valid city name`;
      datahide.classList.add("data_hide");
    }
  }
};

submitBtn.addEventListener("click", getInfo);
