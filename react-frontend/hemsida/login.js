document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("login");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const usernameOrEmail = document.querySelector("#login input[type='text']").value;
        const password = document.querySelector("#login input[type='password']").value;

        // Check if the provided credentials match the admin credentials
        if (usernameOrEmail === "SmartVault" && password === "SmartVault123") {
            // Redirect to the admin page if credentials are correct
            window.location.href = "admin.html";
        } else {
            // Display error message for invalid credentials
            const errorMessage = document.querySelector(".form__message--error");
            errorMessage.innerText = "Invalid username or password.";
            errorMessage.style.display = "block";
        }
    });
});
