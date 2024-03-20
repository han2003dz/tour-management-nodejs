window.addEventListener("DOMContentLoaded", (event) => {
  // Toggle the side navigation
  const sidebarToggle = document.body.querySelector("#sidebarToggle");
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.toggle("sb-sidenav-toggled");
      localStorage.setItem(
        "sb|sidebar-toggle",
        document.body.classList.contains("sb-sidenav-toggled")
      );
    });
  }

  // buttonFilterStatus
  const buttonFilterStatus = document.querySelectorAll("[button-status]");
  if (buttonFilterStatus.length > 0) {
    let url = new URL(window.location.href);
    buttonFilterStatus.forEach((button) => {
      button.addEventListener("click", () => {
        const status = button.getAttribute("button-status");
        if (status) {
          url.searchParams.set("status", status);
        } else {
          url.searchParams.delete("status");
        }
        window.location.href = url.href;
      });
    });
  }
  // end buttonFilterStatus

  // start show-alert
  const showAlert = document.querySelector("[show-alert]");
  if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    const buttonClose = document.querySelector("[close-alert]");
    setTimeout(() => {
      showAlert.classList.add("alert-hidden");
    }, time);

    // sự kiện click mất
    buttonClose.addEventListener("click", () => {
      showAlert.classList.add("alert-hidden");
    });
  }
  // end show-alert
});
