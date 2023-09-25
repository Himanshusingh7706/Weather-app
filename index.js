const temperatureField = document.querySelector(".Weather1");
const cityField = document.querySelector(".Weather2 p");
const dateField = document.querySelector(".Weather2 span");
const emojiField = document.querySelector(".Weather3 img");
const weatherField = document.querySelector(".Weather3 span");
const SearchField = document.querySelector(".Searchfield");
const form = document.querySelector("form");
let target = "delhi";
const fetchData = async (target) => {
  try {
    console.log(target);
    const url = `http://api.weatherapi.com/v1/current.json?key=da864f19bebf473bac7134039233006&q=${target}&aqi`;

    const responce = await fetch(url);
    const data = await responce.json();

    const {
      current: {
        temp_c,
        condition: { text, icon },
      },
      location: { name, localtime },
    } = data;

    updateDom(temp_c, name, localtime, icon, text);
  } catch (error) {
    alert("Location Not found");
  }
};
function updateDom(temperature, city, time, emoji, text) {
  temperatureField.innerText = temperature;
  cityField.innerText = city;
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];
  const exactDay = new Date(exactDate).getDay();

  dateField.innerText = `${exactTime} - ${getDayFullName(
    exactDay
  )} ${exactDate}`;
  emojiField.src = emoji;
  weatherField.innerText = text;
}
fetchData(target);
function getDayFullName(num) {
  switch (num) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";

    default:
      return "God know Baby";
  }
}
const search = (e) => {
  e.preventDefault();
  target = SearchField.value;
  fetchData(target);
};
form.addEventListener("submit", search);
