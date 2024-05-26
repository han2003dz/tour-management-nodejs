const showError = (message) => {
  Swal.fire({
    position: "top",
    icon: "error",
    title: message,
    showConfirmButton: false,
    timer: 1000,
  });
};
const showSuccess = (message) => {
  Swal.fire({
    position: "top",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1000,
  });
};
const contactSubmit = () => {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();
      const notes = document.getElementById("notes").value.trim();

      if (!username || !phone || !email) {
        alert("Please fill out all required fields.");
        return;
      }

      const submitButton = contactForm.querySelector("button[type='submit']");
      submitButton.disabled = true;

      fetch("/api/v1/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, phone, email, notes }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === "success") {
            showSuccess("Hệ thống đã xác nhận thông tin liên hệ của bạn");
            contactForm.reset();
          } else {
            showError("Gửi thông tin liên hệ thất bại");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          showError(
            "Lỗi trong quá trình gửi dữ liệu. Hãy vui lòng chờ đợi chúng tôi xử lý sự cố"
          );
        })
        .finally(() => {
          submitButton.disabled = false;
        });
    });
  }
};

window.onload = () => {
  contactSubmit();
};
