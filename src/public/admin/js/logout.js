const handleLogout = () => {
  const btnLogout = document.querySelector("#btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      Swal.fire({
        title: "Bạn có chắc chắn muốn đăng xuất?",
        text: "Kết thúc phiên đăng nhập hiện tại",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có",
        cancelButtonText: "Hủy",
      })
        .then(async (result) => {
          if (result.isConfirmed) {
            const response = await fetch("/api/v1/auth/logoutAdmin");
            const data = await response.json();
            if (data.code === 200) {
              window.location.href = "/admin/login";
            } else {
              notiError(data.message);
            }
          }
        })
        .catch((error) => {
          notiError(error);
        });
    });
  }
};

window.onload = () => {
  handleLogout();
};
