document.getElementById("registrationForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;
  clearErrors();

  if (document.getElementById("username").value.trim() === "") {
    showError("usernameError", "Username is required.");
    isValid = false;
  }

  const emailValue = document.getElementById("email").value;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    showError("emailError", "Please enter a valid email.");
    isValid = false;
  }

  const password = document.getElementById("password").value;
  if (password.length < 6) {
    showError("passwordError", "Password must be at least 6 characters long.");
    isValid = false;
  }

  if (document.getElementById("confirmPassword").value !== password) {
    showError("confirmPasswordError", "Passwords do not match.");
    isValid = false;
  }

  if (!document.getElementById("agree").checked) {
    showError("agreementError", "You must agree to the terms and conditions.");
    isValid = false;
  }
  if (isValid) {
    alert("Registration successful!");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  }
});

function showError(id, message) {
  const error = document.getElementById(id);
  error.textContent = message;
  error.style.display = "block";
}

function clearErrors() {
  document
    .querySelectorAll(".error-message")
    .forEach((error) => (error.style.display = "none"));
}
