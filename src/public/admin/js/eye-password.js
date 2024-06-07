document.addEventListener("DOMContentLoaded", (event) => {
  const eye = document.querySelector(".eye");
  const passwordField = document.getElementById("password");
  if (eye && passwordField) {
    eye.addEventListener("click", () => {
      let eyePass = eye.querySelector(".eye-pass");

      if (password.type === "password") {
        password.type = "text";
        eyePass.classList.remove("fa-eye");
        eyePass.classList.add("fa-eye-slash");
      } else {
        password.type = "password";
        eyePass.classList.remove("fa-eye-slash");
        eyePass.classList.add("fa-eye");
      }
    });
  }
});
