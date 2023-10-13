const genreSelect = document.getElementById("genreSelect");


fetch('/Music.json')
    .then((response) => response.json())
    .then((json) => console.log(json));

import data from '/Music.json' assert { type: 'json' };
console.log(data);

for (let dict in data) {
    let option = document.createElement("option");
    option.setAttribute('value', data[dict])

    let optionText = document.createTextNode(dict);
    option.appendChild(optionText);

    genreSelect.appendChild(option);
}