import { fetchCountries } from "./function";
import debounce from "lodash/debounce";
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;

const input = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");


const searchCountries = async (name) => {
  try {
    const countries = await fetchCountries(name);
    if (countries.length > 20) {
      Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
      clearResults();
    } else if (countries.length >= 2 && countries.length <= 20) {
      renderCountryList(countries);
      clearCountryInfo();
    } else if (countries.length === 1) {
      renderCountryInfo(countries[0]);
      clearCountryList();
    } else {
      clearResults();
    }
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};

const clearResults = () => {
  clearCountryList();
  clearCountryInfo();
};

const clearCountryList = () => {
  countryList.innerHTML = "";
};

const clearCountryInfo = () => {
  countryInfo.innerHTML = "";
};

const renderCountryList = (countries) => {
  const markup = countries
    .map((country) => `<li><img src="${country.flag}" width="100" height="50"></li>`)
    .join("");
  countryList.innerHTML = markup;
};

const renderCountryInfo = (country) => {
  const markup = `
    <p><img src="${country.flag}" width="200" height="100"></p>
    <p><span>capital</span>: ${country.capital}</p>
    <p><span>poblacion</span>: ${country.population}</p>
    <p><span>lenguajes</span>: ${country.languages}</p>
  `;
  countryInfo.innerHTML = markup;
};

const handleSearch = debounce((event) => {
  const searchTerm = event.target.value.trim();
  if (searchTerm === "") {
    clearResults();
  } else {
    searchCountries(searchTerm);
  }
}, DEBOUNCE_DELAY);

input.addEventListener("input", handleSearch);

