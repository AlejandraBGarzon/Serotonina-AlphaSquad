const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  const formData = new FormData(loginForm);

  try {
    const response = await fetch("http://localhost:8080/usuarios/ingreso", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData),
    });

    if (!response.ok) {
      // Check if the response status is not 2xx (i.e., not successful)
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to log in.");
    }

    // Login successful, redirect or handle the response data
    const responseData = await response.json();
    console.log("User data:", responseData);
    // Redirect to the welcome page or perform other actions.
  } catch (error) {
    errorMessage.textContent = error.message;
  }
});
