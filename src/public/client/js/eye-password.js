const eyePass = document.querySelector(".eye-pass");
if (eyePass) {
  const password = document.querySelector("#password");
  eyePass.addEventListener("click", () => {
    if (password.type === "password") {
      password.type = "text";
      eyePass.classList.remove("bi-eye-fill");
      eyePass.classList.add("bi-eye-slash-fill");
    } else {
      password.type = "password";
      eyePass.classList.remove("bi-eye-slash-fill");
      eyePass.classList.add("bi-eye-fill");
    }
  });
}
