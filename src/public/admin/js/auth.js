const eyePass = document.querySelector(".eye-pass");
const password = document.querySelector("#password");
if (eyePass) {
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

const showError = (message) => {
  alert("Error: " + message);
};
const showSuccess = (message) => {
  alert("Success: " + message);
};
// const handleLogin = () => {
//   const loginForm = document.querySelector("#loginForm");
//   if (loginForm) {
//     loginForm.addEventListener("submit", async (e) => {
//       e.preventDefault();
//       const email = loginForm.querySelector("#email").value;
//       const password = loginForm.querySelector("#password").value;
//       if (!email.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)) {
//         return showError("Email không hợp lệ");
//       }
//       try {
//         let result = await (
//           await fetch(`/api/v1/auth/loginAdmin`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email, password }),
//           })
//         ).json();

//         if (result.code === 200) {
//           showSuccess("Đăng nhập thành công!");
//           handleSaveSession(email);
//           setTimeout(() => (window.location.href = "/admin"), 1000);
//         } else {
//           showError(result.message);
//         }
//       } catch (error) {
//         showError(error);
//       }
//     });
//   }
// };
// const handleSaveSession = (email) => {
//   const loginForm = document.querySelector("#loginForm");
//   if (loginForm) {
//     const isSaveSession = loginForm.querySelector(".basic_checkbox_1").checked;
//     localStorage.setItem("isSaveSession", isSaveSession);
//     localStorage.setItem("email", isSaveSession ? email : null);
//   }
// };

// window.onload = () => {
//   handleLogin();
// };
