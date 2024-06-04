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

const toastMessage = (icon, message) => {
  return new Promise((resolve) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
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
};
