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
  Swal.fire({
    position: "top",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
};
const handleRegister = () => {
  const registerForm = document.querySelector("#registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {};
      const formElements = registerForm.elements;
      for (let i = 0; i < formElements.length; i++) {
        const field = formElements[i];
        if (field.name) {
          data[field.name] = field.value;
        }
      }
      if (!data.email?.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)) {
        return showError("Email không hợp lệ");
      }
      if (!data.password?.match(/\d/) || !data.password?.match(/[a-zA-Z]/)) {
        return showError(
          "Mật khẩu cần tối thiểu 8 kí tự, gồm cả chữ cái và chữ số"
        );
      }
      if (data.password !== data.confirm) {
        return showError("Xác nhận mật khẩu không trùng khớp!");
      }
      try {
        let result = await (
          await fetch(`/api/v1/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
        ).json();
        if (result.code === 201) {
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
          showSuccess("Đăng ký thành công!");
        } else {
          showError(result.message);
        }
      } catch (error) {
        showError(error);
      }
    });
  }
};

const handleLogin = () => {
  const loginForm = document.querySelector("#loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = loginForm.querySelector("#email").value;
      const password = loginForm.querySelector("#password").value;
      if (!email.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)) {
        return showError("Email không hợp lệ");
      }
      try {
        let result = await (
          await fetch(`/api/v1/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          })
        ).json();

        if (result.code === 200) {
          handleSaveSession(email);
          setTimeout(() => {
            window.location.href = "/";
            showSuccess("Đăng nhập thành công!");
          }, 500);
        } else {
          showError(result.message);
        }
      } catch (error) {
        showError(error);
      }
    });
  }
};
const handleSaveSession = (email) => {
  const loginForm = document.querySelector("#loginForm");
  if (loginForm) {
    const isSaveSession = loginForm.querySelector(".basic_checkbox_1").checked;
    localStorage.setItem("isSaveSession", isSaveSession);
    localStorage.setItem("email", isSaveSession ? email : null);
  }
};

window.onload = () => {
  handleRegister();
  handleLogin();
};
