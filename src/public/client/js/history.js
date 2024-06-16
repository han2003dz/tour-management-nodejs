const review = () => {
  const btnFeedback = document.querySelectorAll("[feedback]");
  if (btnFeedback) {
    btnFeedback.forEach((btn) =>
      btn.addEventListener("click", async () => {
        const userId = btn.getAttribute("data-id-user");
        const tourId = btn.getAttribute("data-id-tour");
        const { value: text } = await Swal.fire({
          input: "textarea",
          inputLabel: "Nội dung đánh giá",
          inputPlaceholder: "Type your message here...",
          inputAttributes: {
            "aria-label": "Type your message here",
          },
          showCancelButton: true,
        });
        const { value: rating } = await Swal.fire({
          title: "Chọn mức sao bạn muốn đánh giá",
          input: "select",
          inputOptions: {
            Ratings: {
              1: "1",
              2: "2",
              3: "3",
              4: "4",
              5: "5",
            },
          },
          inputPlaceholder: "Select a rating",
          showCancelButton: true,
          inputValidator: (value) => {
            return new Promise((resolve) => {
              if (value) {
                resolve();
              } else {
                resolve("You need to select a rating :)");
              }
            });
          },
        });

        if (text || rating) {
          try {
            await fetch(`/api/v1/review/submit/${userId}/${tourId}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ comment: text, rating: Number(rating) }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                if (data.code === 200) {
                  toastMessage(
                    "success",
                    "Cảm ơn bạn đã gửi phản hồi của mình về chuyến đi"
                  );
                } else {
                  toastMessage("error", "Bạn chưa thể gửi phản hồi bây giờ");
                }
              })
              .catch((error) => {
                console.error("Fetch không thành công:", error);
                toastMessage(
                  "error",
                  "An error occurred while submitting your feedback."
                );
              });
          } catch (error) {
            console.error("Fetch không thành công:", error);
            toastMessage(
              "error",
              "An error occurred while submitting your feedback."
            );
          }
        }
      })
    );
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
  review();
};
