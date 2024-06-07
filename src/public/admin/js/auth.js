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
        let response = await fetch(`/api/v1/auth/loginAdmin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        let result = await response.json();
        console.log("Kết quả từ API:", result);
        console.log(result.code);
        if (result.code === 200) {
          handleSaveSession(email);
          toastMessage("success", "Đăng nhập thành công vào hệ thống!");
          setTimeout(() => {
            window.location.href = "/admin";
          }, 500);
        } else {
          toastMessage("error", "Bạn không có quyền truy cập");
        }
      } catch (error) {
        toastMessage("error", "Đăng nhập thất bại!");
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

const toastMessage = (icon, message) => {
  return new Promise((resolve) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1200,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
      willClose: () => {
        resolve();
      },
    });
    Toast.fire({
      icon: icon,
      title: message,
    });
  });
};

window.onload = () => {
  handleLogin();
};
