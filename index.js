const dropdown = document.getElementById('city-dropdown');
const input = dropdown.querySelector('#search_city');
const options = dropdown.querySelectorAll('#city-dropdown li');
const menu = dropdown.querySelector('#city-list');

const checkIn = document.getElementById('checkIn');
const checkOut = document.getElementById('checkOut');
const nightsNumber = document.getElementById('nightsNumber');
const searchInput = document.getElementById("country-search");
const optionsList = document.getElementById("country-options");
const countries = [
    { name: "South Africa", flag: "https://flagcdn.com/16x12/za.png" },
    { name: "Egypt", flag: "https://flagcdn.com/16x12/eg.png" },
    { name: "United states", flag: "https://flagcdn.com/16x12/us.png" },
    { name: "Australia", flag: "https://flagcdn.com/16x12/au.png" },
    { name: "Brazil", flag: "https://flagcdn.com/16x12/br.png" },
    { name: "France", flag: "https://flagcdn.com/16x12/fr.png" },
    { name: "Italy", flag: "https://flagcdn.com/16x12/it.png" },
    { name: "England", flag: "https://flagcdn.com/16x12/gb-eng.png" },
    { name: "Saudi Arabia", flag: "https://flagcdn.com/16x12/sa.png" },

    // add more countries and their flag URLs
];

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

// Pad the month and day values with zeros if necessary
const paddedMonth = month.toString().padStart(2, '0');
const paddedDay = day.toString().padStart(2, '0');

// Set the value of the input field to today's date
checkIn.value = `${year}-${paddedMonth}-${paddedDay}`;
checkOut.value = `${year}-${paddedMonth}-${paddedDay}`;

input.addEventListener('input', () => {
    if (input.value.length > 0) {
        menu.classList.remove('hidden');
        menu.classList.add('block');
    } else {
        menu.classList.add('hidden');
        menu.classList.remove('block');
    }
});

input.addEventListener('input', function () {
    const inputValue = this.value.toLowerCase();
    options.forEach(function (option) {
        const optionText = option.textContent.toLowerCase();
        if (optionText.indexOf(inputValue) > -1) {
            option.style.display = '';
        } else {
            option.style.display = 'none';
        }
    });
});

document.addEventListener('click', function (event) {
    if (!dropdown.contains(event.target)) {
        menu.classList.add('hidden');
        menu.classList.remove('block');
    }
});
options.forEach(function (option) {
    option.addEventListener('click', function () {
        input.value = option.textContent;
        menu.classList.add('hidden');
        menu.classList.remove('block');
    });
});

// handle click for date input

checkIn.addEventListener('input', e => {
    const date = e.target.value;
    checkOut.value = date;

});

checkOut.addEventListener('input', e => {
    const startDate = new Date(checkIn.value);
    const endDate = new Date(e.target.value);
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const diffInMs = endDate.getTime() - startDate.getTime();
    const diffInDays = Math.round(diffInMs / oneDay);
    nightsNumber.value = diffInDays
    console.log(diffInDays);

});
nightsNumber.addEventListener('input', e => {
    const startDate = new Date(checkIn.value);
    const numNights = Number(e.target.value);
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + numNights);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const paddedMonth = month.toString().padStart(2, '0');
    const paddedDay = day.toString().padStart(2, '0');
    checkOut.value = `${year}-${paddedMonth}-${paddedDay}`;

});


countries.forEach((country) => {
    const option = document.createElement("li");
    option.value = country.name;
    option.innerHTML = `<img src="${country.flag}" alt="${country.name} flag" width="16" height="16"> ${country.name}`;
    optionsList.appendChild(option);
});

searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();
    if(searchValue.length > 0) {
        const filteredCountries = countries.filter((country) => {
            return country.name.toLowerCase().includes(searchValue);
        });
        console.log(filteredCountries)
        // remove all options except the placeholder option
        optionsList.innerHTML = "";
        const placeholderOption = document.createElement("li");
        placeholderOption.classList.add("option");
        placeholderOption.setAttribute("data-value", "");
        placeholderOption.innerHTML = "Select a country";
        optionsList.appendChild(placeholderOption);
    
        // add filtered options to the ul element
        filteredCountries.forEach((country) => {
            const option = document.createElement("li");
            option.classList.add("option");
            option.setAttribute("data-value", country.name);
            option.innerHTML = `<img src="${country.flag}" alt="${country.name} flag" width="16" height="16"> ${country.name}`;
            optionsList.appendChild(option);
        });
    
        // show/hide the dropdown based on the number of options
        if (filteredCountries.length > 0) {
            optionsList.style.display = "block";
        } else {
            optionsList.style.display = "none";
        }
    }else{
        optionsList.style.display = "none";
        
    }
   
});

// hide the dropdown when the user clicks outside of it
document.addEventListener("click", (event) => {
    if (!event.target.closest(".dropdown")) {
        optionsList.style.display = "none";
    }
});



// select the clicked option and update the search input value
optionsList.addEventListener("click", (event) => {
    const option = event.target.closest(".option");
    if (option) {
        const value = option.getAttribute("data-value");
        if (value) {
            searchInput.value = value;
        } else {
            searchInput.value = "";
        }
        optionsList.style.display = "none";
    }
});
