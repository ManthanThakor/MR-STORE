document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission
  let isValid = true;
  clearErrors();

  const emailValue = document.getElementById("loginEmail").value;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    showError("loginEmailError", "Please enter a valid email.");
    isValid = false;
  }

  const password = document.getElementById("loginPassword").value;
  if (password.length < 6) {
    showError(
      "loginPasswordError",
      "Password must be at least 6 characters long."
    );
    isValid = false;
  }

  if (isValid) {
    alert("Login successful!");
    setTimeout(() => {
      window.location.href = "../index.html";
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
