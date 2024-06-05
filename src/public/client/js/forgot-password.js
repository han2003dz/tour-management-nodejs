
const forgotPassword = () => {
  const forgotPasswordForm = document.querySelector("#forgot-password");
  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const emailInput = forgotPasswordForm.querySelector(
        "input[name='email']"
      );
      const email = emailInput.value;
      fetch("/api/v1/users/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            toastMessage("success", data.message);
            window.location.href = `/otp?email=${email}`;
          } else {
            toastMessage("error", data.message);
          }
        })
        .catch((error) => {
          console.error("Fetch không thành công:", error);
        });
    });
  }
};

const otp = () => {
  const otpForm = document.querySelector("#otp-form");
  if (otpForm) {
    otpForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const emailInput = otpForm.querySelector("input[name='email']");
      const email = emailInput.value;
      const otp = otpForm.querySelector("input[name='otp']").value;
      fetch("/api/v1/users/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            toastMessage("success", data.message);
            window.location.href = `/reset-password?email=${email}`;
          } else {
            toastMessage("error", data.message);
          }
        })
        .catch((error) => {
          console.error("Fetch không thành công:", error);
        });
    });
  }
};

const resetPassword = () => {
  const resetForm = document.querySelector("#reset-password-form");
  if (resetForm) {
    resetForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = resetForm.querySelector("input[name='email']").value;
      const password = resetForm.querySelector("#password").value;
      fetch("/api/v1/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            toastMessage("success", data.message);
            window.location.href = `/login`;
          } else {
            toastMessage("error", data.message);
          }
        })
        .catch((error) => {
          console.error("Fetch không thành công:", error);
        });
    });
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
  forgotPassword();
  otp();
  resetPassword();
};
