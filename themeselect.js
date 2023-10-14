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