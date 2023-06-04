import Notiflix from 'notiflix';
export async function fetchCountries(name) {
    const lista = document.querySelector(".country-list");
    const info = document.querySelector(".country-info");
    const url = `https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags,languages`;
   try {
        const response = await fetch(url);
        if (!response.ok) {
            lista.innerHTML = "";
            info.innerHTML = "";
            Notiflix.Notify.failure("Oops, there is no country with that name");
            throw new Error("404 Error Network response was not ok");

        }
        const data = await response.json();
        // const limitedResults = data.slice(0,5);
        console.log(data);
        return data.map((country) => {
            return {
                flag: `${country.flags.png}`,
                name: country.altSpellings?.[2] || "Unknown",
                capital: country.capital?.[0] || "Unknown",
                population: country.population?.toLocaleString() || "Unknown",
                languages: Object.values(country.languages).map(lang => lang).join(", ")
            };

        });
    } catch (error) {
        console.error("Error fetching countries:", error);
    }
  }
  

 

  