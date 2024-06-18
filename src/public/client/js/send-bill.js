document.addEventListener("DOMContentLoaded", () => {
  const btnOrderID = document.querySelector("[btnBill]");
  const emailElement = document.querySelector(".email");
  const email = emailElement ? emailElement.getAttribute("data-email") : null;

  if (btnOrderID && email) {
    btnOrderID.addEventListener("click", async () => {
      const { value: code } = await Swal.fire({
        input: "text",
        inputLabel: "Order ID",
        inputPlaceholder: "Enter the Order ID",
      });

      if (code) {
        try {
          const response = await fetch(
            `/api/v1/users/look-up-bill?code=${encodeURIComponent(
              code
            )}&email=${encodeURIComponent(email)}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();

          if (data.code === 200) {
            await toastMessage("success", "Thành công");
          } else {
            await toastMessage("error", "Bạn chưa thể gửi mã order bây giờ");
          }
        } catch (error) {
          console.error("Fetch không thành công:", error);
          await toastMessage(
            "error",
            "An error occurred while submitting your orderID."
          );
        }
      }
    });
  } else {
    console.log("Button or email element not found.");
  }
});

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
