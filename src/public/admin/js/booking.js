const handleCancelOrder = () => {
  document.querySelectorAll(".btn-cancel-item").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const orderId = btn.getAttribute("data-item-id");
      console.log(orderId);
      confirmCancelOrder(orderId);
    });
  });
};

const toastMessage = (icon, message) => {
  return new Promise((resolve) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 500,
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

const updateTbl = () => {
  window.location.reload();
};
const confirmCancelOrder = (orderId) => {
  Swal.fire({
    title: "Bạn có chắc chắn muốn hủy chuyến đi này không?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Có",
    cancelButtonText: "Hủy",
  })
    .then(async (willCancel) => {
      if (willCancel) {
        try {
          const response = await fetch(`/api/v1/booking/cancel/${orderId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const result = await response.json();
          console.log(result);
          if (result.code === 200) {
            toastMessage("success", result.message);
            updateTbl();
          } else {
            toastMessage("error", result.message);
          }
        } catch (err) {
          toastMessage("error", result.message);
        }
      }
    })
    .catch((err) => {
      toastMessage("error", result.message);
    });
};

document.addEventListener("DOMContentLoaded", () => {
  handleCancelOrder();
});
