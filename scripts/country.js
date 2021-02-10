"use strict";

window.onload = () => {
    document.title = window.name;
    let restService = "https://restcountries.eu/rest/v2/name/" + window.name;
    renderCountry(restService, callbackGenerateCountryHTML);
};

function callbackGenerateCountryHTML() {
    if (this.readyState == 4 && this.status == 200) {
        let countryObj = JSON.parse(this.responseText);
        generateCountryHTML({ ...countryObj[0] });
    }
}

document.getElementById("back-button").addEventListener("click", () => {
    window.open("./filter.html");
    window.close();
});

document.getElementById("dark-mode-button").addEventListener("click", () => {
    let navbarColor = document.getElementById("navbar").style.backgroundColor;

    if (navbarColor === "white" || navbarColor === "") {
        setDarkMode();
    } else {
        setLightMode();
    }
});

function isLightMode() {
    let navbarColor = document.getElementById("navbar").style.backgroundColor;
    return navbarColor === "white" || navbarColor === "";
}

function isDarkMode() {
    return !isLightMode();
}

function setDarkMode() {
    let navbar = document.getElementById("navbar");
    navbar.style.backgroundColor = "rgb(43, 55, 67)";
    navbar.style.color = "rgb(249, 255, 255)";

    let main = document.getElementById("main");
    main.style.backgroundColor = "rgb(33, 46, 55)";
    main.style.color = "rgb(249, 255, 255)";

    let body = document.getElementsByTagName("body")[0];
    body.style.backgroundColor = "rgb(33, 46, 55)";
    body.style.color = "rgb(249, 255, 255)";

    let darkButton = document.getElementById("dark-mode-button");
    darkButton.style.backgroundColor = "white";

    let borderCountries = document.getElementsByClassName("border-country");

    let listItems = Array.from(borderCountries);

    listItems.forEach((listItem) => (listItem.style.backgroundColor = "rgb(43, 44, 67"));
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
    body.style.color = "black";

    let darkButton = document.getElementById("dark-mode-button");
    darkButton.style.backgroundColor = "white";

    let borderCountries = document.getElementsByClassName("border-country");

    let listItems = Array.from(borderCountries);

    listItems.forEach((listItem) => (listItem.style.backgroundColor = "white"));
}

function renderCountry(restService, callback) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = callback;

    xhttp.open("GET", restService, true);
    xhttp.send();
}

function generateCountryHTML(country) {
    let newCountryNode = renderCountryNode(country);

    document.getElementById("country-info").appendChild(newCountryNode);
}

function renderCountryNode(countryObject) {
    let divContainer = document.createElement("div");
    divContainer.id = "country-container-wrapper";

    let countryInfoNode = generateCountryInfoNode(countryObject);
    let countryMoreInfoNode = generateCountryMoreInfoNode(countryObject);
    let countryBordersNode = generateBorderCountriesNode(countryObject);

    divContainer.appendChild(countryInfoNode);
    divContainer.appendChild(countryMoreInfoNode);

    if (countryBordersNode.innerHTML.includes("li")) {
        let spanElement = document.createElement("span");
        spanElement.className = "first-word";
        spanElement.innerHTML = "Border Countries:";

        document.getElementById("country-borders").appendChild(spanElement);
    }

    document.getElementById("country-borders").appendChild(countryBordersNode);

    return divContainer;
}

function generateCountryMoreInfoNode(countryObject) {
    let countryMoreInfoNode = document.createElement("div");
    countryMoreInfoNode.id = "country-more-info";

    let countryTopLevelDomainNode = document.createElement("span");
    countryTopLevelDomainNode.innerHTML = `<strong>Top Level Domain</strong>: ${countryObject.topLevelDomain}`;
    countryTopLevelDomainNode.className = "first-word";

    let countryCurrenciesNode = document.createElement("span");
    countryCurrenciesNode.innerHTML = `<strong>Currencies</strong>:
    ${countryObject.currencies.map((e) => e.name).join(", ")}`;
    countryCurrenciesNode.className = "first-word";

    let countryLanguagesNode = document.createElement("span");
    countryLanguagesNode.innerHTML = `<strong>Languages</strong>:
        ${countryObject.languages.map((e) => e.name).join(", ")}`;
    countryLanguagesNode.className = "first-word";

    countryMoreInfoNode.appendChild(countryTopLevelDomainNode);
    countryMoreInfoNode.appendChild(countryCurrenciesNode);
    countryMoreInfoNode.appendChild(countryLanguagesNode);

    return countryMoreInfoNode;
}

function generateCountryInfoNode(countryObject) {
    document.getElementById("country-name").innerHTML = countryObject.name;
    document.getElementById("country-flag").src = countryObject.flag;

    let countryInfoNode = document.createElement("div");
    countryInfoNode.id = "country-info";

    let countryNativeNameNode = document.createElement("span");
    countryNativeNameNode.innerHTML = `<strong>Native Name</strong>: ${countryObject.nativeName}`;
    countryNativeNameNode.className = "first-word";

    let countryPopulationNode = document.createElement("span");
    countryPopulationNode.innerHTML = `<strong>Population</strong>: ${new Intl.NumberFormat().format(
        countryObject.population
    )}`;
    countryPopulationNode.className = "first-word";

    let countryRegionNode = document.createElement("span");
    countryRegionNode.innerHTML = `<strong>Region</strong>: ${countryObject.region}`;
    countryRegionNode.className = "first-word";

    let countrySubRegionNode = document.createElement("span");
    countrySubRegionNode.innerHTML = `<strong>Sub Region</strong>: ${countryObject.subregion}`;
    countrySubRegionNode.className = "first-word";

    let countryCapitalNode = document.createElement("span");
    countryCapitalNode.innerHTML = `<strong>Capital</strong>: ${countryObject.capital}`;
    countryCapitalNode.className = "first-word";

    countryInfoNode.appendChild(countryNativeNameNode);
    countryInfoNode.appendChild(countryPopulationNode);
    countryInfoNode.appendChild(countryRegionNode);
    countryInfoNode.appendChild(countrySubRegionNode);
    countryInfoNode.appendChild(countryCapitalNode);

    return countryInfoNode;
}

function generateBorderCountriesNode(countryObject) {
    let countriesBorderNode = document.createElement("ul");
    countriesBorderNode.id = "borders";

    countryObject.borders.forEach((b) => {
        let borderNode = document.createElement("li");
        borderNode.innerHTML = b;
        borderNode.className = "border-country";

        if (isDarkMode()) {
            borderNode.style.backgroundColor = "rgb(43, 44, 67)";
        } else {
            borderNode.style.backgroundColor = "white";
        }

        borderNode.addEventListener("click", () => {
            clearCountryHMTL();

            let restServiceCountryByCode = `https://restcountries.eu/rest/v2/alpha/${b}`;

            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let countryName = JSON.parse(this.responseText).name;

                    document.title = countryName;

                    let restServiceCountryByName = `https://restcountries.eu/rest/v2/name/${countryName}`;
                    renderCountry(restServiceCountryByName, callbackGenerateCountryHTML);
                }
            };

            xhttp.open("GET", restServiceCountryByCode, true);
            xhttp.send();
        });

        countriesBorderNode.appendChild(borderNode);
    });

    return countriesBorderNode;
}

function clearCountryHMTL() {
    document.getElementById("country-name").innerHTML = "";
    document.getElementById("country-info").innerHTML = "";
    document.getElementById("country-borders").innerHTML = "";
   
}
