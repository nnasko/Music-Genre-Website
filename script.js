const genreSelect = document.getElementById("genreSelect");

fetch('/Music.json')
    .then((response) => response.json())
    .then((data) => {
        for (let genre in data) {
            let option = document.createElement("option");
            option.value = genre;  // Set the value to the genre name
            option.textContent = genre;  // Set the displayed text to the genre name
            genreSelect.appendChild(option);
        }
    })
    .catch((error) => {
        console.error("Error loading data: " + error);
    });


var genreDropdown = document.getElementById("genreSelect");

var resultDiv = document.getElementById("result");

genreDropdown.addEventListener("change", function () {
    // Get the selected genre
    var selectedGenre = genreDropdown.value;

    // Fetch the JSON data from "Music.json"
    fetch("Music.json")
        .then((response) => {
            if (response.ok) {
                return response.json(); // Parse the JSON response
            } else {
                throw new Error("Failed to fetch data");
            }
        })
        .then((jsonData) => {
            // Extract songs for the selected genre
            var selectedGenreData = jsonData[selectedGenre];

            // Display the extracted data
            resultDiv.innerHTML = "";

            if (selectedGenreData) {
                // Create a table to display the data
                var table = document.createElement("table");
                var headerRow = table.insertRow(0);
                var songHeader = headerRow.insertCell(0);
                var artistHeader = headerRow.insertCell(1);
                var runtimeHeader = headerRow.insertCell(2);
                songHeader.innerHTML = "Song";
                artistHeader.innerHTML = "Artist";
                runtimeHeader.innerHTML = "Runtime";

                // Loop through songs in the selected genre
                for (var song in selectedGenreData) {
                    if (selectedGenreData.hasOwnProperty(song)) {
                        var songData = selectedGenreData[song];
                        var row = table.insertRow(table.rows.length);
                        var songCell = row.insertCell(0);
                        var artistCell = row.insertCell(1);
                        var runtimeCell = row.insertCell(2);
                        songCell.innerHTML = song;
                        artistCell.innerHTML = songData.Artist;
                        runtimeCell.innerHTML = songData.Runtime;
                    }
                }

                resultDiv.appendChild(table);
            } else {
                resultDiv.innerHTML = "No data available for the selected genre.";
            }
        })
        .catch((error) => {
            console.error("Error loading data: " + error);
        });
});

document.addEventListener("DOMContentLoaded", function () {
    // Check if the user has a preferred theme in local storage
    const userTheme = localStorage.getItem("preferredTheme");

    // Apply the user's preferred theme or the default (light) theme
    if (userTheme === "dark") {
        document.getElementById("stylesheet").setAttribute("href", "dark.css");
        document.getElementById("themeToggle").checked = true;
    }

    // Add an event listener for the checkbox input
    document.getElementById("themeToggle").addEventListener("change", function () {
        // Toggle between dark and light themes
        const currentTheme = document.getElementById("stylesheet").getAttribute("href");
        if (currentTheme === "light.css") {
            document.getElementById("stylesheet").setAttribute("href", "dark.css");
            localStorage.setItem("preferredTheme", "dark");
        } else {
            document.getElementById("stylesheet").setAttribute("href", "light.css");
            localStorage.setItem("preferredTheme", "light");
        }
    });
});