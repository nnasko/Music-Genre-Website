document.addEventListener("DOMContentLoaded", function () {
    // Check if the user has a preferred theme in local storage
    const userTheme = localStorage.getItem("preferredTheme");

    // Apply the user's preferred theme or the default (light) theme
    if (userTheme === "dark") {
        document.getElementById("stylesheet").setAttribute("href", "dark.css");
        document.getElementById("themeToggle").checked = true;
    }

    // Fetch your JSON data (replace 'Music.json' with your actual file)
    fetch('Music.json')
        .then((response) => response.json())
        .then((data) => {
            displayAverageRuntimes(data);
        })
        .catch((error) => console.error(error));
});

// Function to calculate and display average runtimes by genre
function displayAverageRuntimes(data) {
    const averageRuntimesElement = document.getElementById("averageRuntimes");

    // Calculate average runtimes by genre
    const averages = {};
    for (const genre in data) {
        const songs = data[genre];
        let totalRuntime = 0;
        let songCount = 0;
        for (const song in songs) {
            const runtimeParts = songs[song].Runtime.split(":");
            const minutes = parseInt(runtimeParts[0], 10);
            const seconds = parseInt(runtimeParts[1], 10);
            totalRuntime += minutes * 60 + seconds;
            songCount++;
        }
        const averageRuntimeInSeconds = totalRuntime / songCount;

        // Calculate average runtime in minutes and seconds with leading zeros
        const averageMinutes = String(Math.floor(averageRuntimeInSeconds / 60)).padStart(2, "0");
        const averageSeconds = String(Math.round(averageRuntimeInSeconds % 60)).padStart(2, "0");

        averages[genre] = `${averageMinutes}:${averageSeconds}`; // Format as "MM:SS"
    }

    // Create HTML to display the averages
    let html = "<table>";
    html += "<tr><th>Genre</th><th>Average Runtime (minutes:seconds)</th></tr>";
    for (const genre in averages) {
        html += `<tr><td>${genre}</td><td>${averages[genre]}</td></tr>`;
    }
    html += "</table>";

    // Update the content in the "averageRuntimes" element
    averageRuntimesElement.innerHTML = html;
}
