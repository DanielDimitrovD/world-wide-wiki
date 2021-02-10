"use strict";

window.onload = () => {
    renderMainPage();
};

document.getElementById("filter-category").addEventListener("change", () => {
    const filterOption = document.getElementById("filter-category").value;

    document.getElementById("search-country-field").placeholder = `Search by ${filterOption}`;
});

document.getElementById("search-button").addEventListener("click", () => {
    const filterOption = document.getElementById("filter-category").value;
    const filterValue = document.getElementById("search-country-field").value;

    if (!filterValue) {
        alert("Insert search option value!");
        return;
    }

    switch (filterOption) {
        case "default": {
            alert("Please choose a search option");
            break;
        }
        case "full-name": {
            if (!validateCountryFullName(filterValue)) {
                alert("Not a valid inpit for country full name!");
                break;
            }
            renderCountryByFullName(filterValue);
            break;
        }
        case "country-code": {
            if (!validateCountryCode(filterValue)) {
                alert("Not a valid input for country code!Should be 2 or 3 leters.");
                break;
            }
            renderCountryByCode(filterValue);
            break;
        }
        case "currency-code": {
            if (!validateCountryCurrency(filterValue)) {
                alert("Not a valid input for country currency!Should be ISO 4217 currency code.");
                break;
            }
            renderCountryByCurrency(filterValue);
            break;
        }
        case "language-code": {
            if (!validateCountryLanguage(filterValue)) {
                alert("Not a valid input for country language!Must be ISO 639-1 language code.");
                break;
            }
            renderCountryByLanguage(filterValue);
            break;
        }
        case "capital-city": {
            if (!validateCountryCapital(filterValue)) {
                alert("Not a valid input for country capital!");
                break;
            }
            renderCountryByCapital(filterValue);
            break;
        }
        case "calling-code": {
            if (!validateCountryCallingCode(filterValue)) {
                alert("Not a valid input for country calling code!Must be numbers only.");
                break;
            }
            renderCountryByCallingCode(filterValue);
            break;
        }
    }
});

function sendRequest(restService, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = callback;
    xhttp.open("GET", restService, true);
    xhttp.send();
}

function renderCountryByFullName(countryFullName) {
    if (countryFullName) {
        const restService = `https://restcountries.eu/rest/v2/name/${countryFullName}?fullText=true?fields=name;capital;flag;population;region`;

        sendRequest(restService, callbackRenderSearchResults);
    }
}

function renderCountryByCode(countryCode) {
    if (countryCode) {
        const restService = `https://restcountries.eu/rest/v2/alpha/${countryCode}?fields=name;capital;flag;population;region`;
        sendRequest(restService, callbackRenderSearchResults);
    }
}

function renderCountryByCurrency(countryCurrency) {
    if (countryCurrency) {
        const restService = `https://restcountries.eu/rest/v2/currency/${countryCurrency}?fields=name;capital;flag;population;region`;
        sendRequest(restService, callbackRenderSearchResults);
    }
}

function renderCountryByLanguage(countryLanguage) {
    if (countryLanguage) {
        const restService = `https://restcountries.eu/rest/v2/lang/${countryLanguage}?fields=name;capital;flag;population;region`;
        sendRequest(restService, callbackRenderSearchResults);
    }
}

function renderCountryByCapital(countryCapital) {
    if (countryCapital) {
        const restService = `https://restcountries.eu/rest/v2/capital/${countryCapital}?fields=name;capital;flag;population;region`;
        sendRequest(restService, callbackRenderSearchResults);
    }
}

function renderCountryByCallingCode(callingCode) {
    if (callingCode) {
        const restService = `https://restcountries.eu/rest/v2/callingcode/${callingCode}?fields=name;capital;flag;population;region`;
        sendRequest(restService, callbackRenderSearchResults);
    }
}

function callbackRenderSearchResults() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("article").innerHTML = "";

        let object = JSON.parse(this.responseText);

        generateMainPageCountriesHMLT(object, object.length);

        return true;
    }

    if (this.readyState == 4 && this.status == 404) {
        alert("Not valid input!");
        return false;
    }
}

function validateCountryFullName(countryName) {
    const countryFullNameRegex = "^[a-zA-Z ]+$";
    return new String(countryName).match(countryFullNameRegex) != null ? true : false;
}

function validateCountryCode(countryCode) {
    const countryCodeRegex = "[a-zA-Z]{2,3}";
    return new String(countryCode).match(countryCodeRegex) != null ? true : false;
}

function validateCountryCurrency(countryCurrency) {
    const countryCurrencyRegex = "^[a-zA-Z]+$";
    return new String(countryCurrency).match(countryCurrencyRegex) != null ? true : false;
}

function validateCountryLanguage(countryLanguage) {
    const countryLanguageRegex = "^[a-zA-Z]+$";
    return new String(countryLanguage).match(countryLanguageRegex) != null ? true : false;
}

function validateCountryCapital(countryCapital) {
    const countryCapitalRegex = "^[A-Z][a-z]+( [A-Z][a-z]+)*$";
    return new String(countryCapital).match(countryCapitalRegex) != null ? true : false;
}

function validateCountryCallingCode(countryCallingCode) {
    const countryCallingCodeRegex = "^[0-9]+$";
    return new String(countryCallingCode).match(countryCallingCodeRegex) != null ? true : false;
}

function validateCountry(countryName) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status != 200) {
            alert("Invalid country name! Please try again.");
        }

        if (this.readyState == 4 && this.status == 200) {
            window.open("../html/country.html", countryName);
            window.close();
        }
    };

    const restService = `https://restcountries.eu/rest/v2/name/${countryName}?fields=name`;

    xhttp.open("GET", restService, false);
    xhttp.send();
}

document.getElementById("dark-mode-button").addEventListener("click", () => {
    let navbarColor = document.getElementById("navbar").style.backgroundColor;

    if (navbarColor === "white" || navbarColor === "") {
        setDarkMode();
    } else {
        setLightMode();
    }
});

function setDarkMode() {
    let navbar = document.getElementById("navbar");
    navbar.style.backgroundColor = "rgb(43, 55, 67)";
    navbar.style.color = "rgb(249, 255, 255)";

    let main = document.getElementById("main");
    main.style.backgroundColor = "rgb(33, 46, 55)";

    let body = document.getElementsByTagName("body")[0];
    body.style.backgroundColor = "rgb(33, 46, 55)";

    let darkButton = document.getElementById("dark-mode-button");
    darkButton.style.backgroundColor = "white";

    let countries = document.getElementsByClassName("country-container");
    Array.from(countries).forEach((c) => {
        c.style.backgroundColor = "rgb(43, 55, 67)";
        c.style.color = "white";
    });

    let spanText = document.getElementsByClassName("first-word");
    Array.from(spanText).forEach((c) => {
        c.style.color = "white";
    });

    let filterCategory = document.getElementById("filter-category");
    filterCategory.style.backgroundColor = "rgb(43, 55, 67)";
    filterCategory.style.color = "white";
}

function setLightMode() {
    let navbar = document.getElementById("navbar");
    navbar.style.backgroundColor = "white";
    navbar.style.color = "black";

    let main = document.getElementById("main");
    main.style.backgroundColor = "#f5f5f0";
    main.style.color = "black";

    let body = document.getElementsByTagName("body")[0];
    body.style.backgroundColor = "#f5f5f0";

    let darkButton = document.getElementById("dark-mode-button");
    darkButton.style.backgroundColor = "white";

    let countries = document.getElementsByClassName("country-container");

    Array.from(countries).forEach((c) => {
        c.style.backgroundColor = "white";
        c.style.color = "black";
    });

    let spanText = document.getElementsByClassName("first-word");
    Array.from(spanText).forEach((c) => {
        c.style.color = "black";
    });

    let filterCategory = document.getElementById("filter-category");
    filterCategory.style.backgroundColor = "white";
    filterCategory.style.color = "black";
}

function renderMainPage() {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let object = JSON.parse(this.responseText);
            let defaultCountriesCount = 15;
            generateMainPageCountriesHMLT(object, defaultCountriesCount);
        }
    };

    const restService =
        "https://restcountries.eu/rest/v2/region/europe?fields=name;capital;flag;population;region";

    xhttp.open("GET", restService, true);
    xhttp.send();
}

function renderCountry(countryName) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let countryObj = JSON.parse(this.responseText);
            generateCountryHTML({ ...countryObj[0] });
        }
    };

    xhttp.open("GET", "https://restcountries.eu/rest/v2/name/" + countryName, true);
    xhttp.send();
}

function generateCountryHTML(country) {
    let newCountryNode = renderCountryNode(country);

    document.getElementById("article").appendChild(newCountryNode);
}

function generateCountriesHTML(countriesArray, index) {
    let country = { ...countriesArray[index] };

    let newCountryNode = renderCountryNode(country);

    document.getElementById("article").appendChild(newCountryNode);
}

function generateMainPageCountriesHMLT(countriesArray, countriesCount) {
    if (Array.isArray(countriesArray)) {
        for (let i = 0; i < countriesCount; i++) {
            generateCountriesHTML(countriesArray, i);
        }
    } else {
        generateCountryHTML(countriesArray);
    }
}

function renderCountryNode(countryObject) {
    let divContainer = document.createElement("section");
    divContainer.className = "country-container";
    divContainer.id = countryObject.name;

    divContainer.style.backgroundColor = document.getElementById("navbar").style.backgroundColor;
    divContainer.style.color = document.getElementById("navbar").style.color;

    divContainer.addEventListener("click", () => {
        window.open("../html/country.html", countryObject.name);
        window.close();
    });

    let countryFlagWrapperDiv = document.createElement("div");
    countryFlagWrapperDiv.className = "country-flag-container";

    let countryFlagNode = document.createElement("img");
    countryFlagNode.src = countryObject.flag;
    countryFlagNode.className = "country-flag";

    let countryNameNode = document.createElement("p");
    countryNameNode.className = "country-name";

    countryNameNode.innerHTML = countryObject.name;

    let countryInfoNode = generateCountryInfoNode(countryObject);

    countryFlagWrapperDiv.appendChild(countryFlagNode);

    divContainer.appendChild(countryFlagWrapperDiv);
    divContainer.appendChild(countryNameNode);
    divContainer.appendChild(countryInfoNode);

    return divContainer;
}

function generateCountryInfoNode(countryObject) {
    let countryInfoNode = document.createElement("div");
    countryInfoNode.className = "country-info";

    let color = document.getElementById("navbar").style.color;

    let countryPopulationNode = document.createElement("span");
    countryPopulationNode.innerHTML = `<strong>Population</strong>: ${new Intl.NumberFormat().format(
        countryObject.population
    )}`;
    countryPopulationNode.className = "first-word";
    countryPopulationNode.style.color = color;

    let countryRegionNode = document.createElement("span");
    countryRegionNode.innerHTML = `<strong>Region</strong>: ${countryObject.region}`;
    countryRegionNode.className = "first-word";
    countryRegionNode.style.color = color;

    let countryCapitalNode = document.createElement("span");
    countryCapitalNode.innerHTML = `<strong>Capital</strong>: ${countryObject.capital}`;
    countryCapitalNode.className = "first-word";
    countryCapitalNode.style.color = color;

    countryInfoNode.appendChild(countryPopulationNode);
    countryInfoNode.appendChild(countryRegionNode);
    countryInfoNode.appendChild(countryCapitalNode);

    return countryInfoNode;
}
