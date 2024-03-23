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
    const hideAlert = () => {
      showAlert.classList.add("alert-hidden");
    };
    setTimeout(hideAlert, time);
    if (buttonClose) {
      buttonClose.addEventListener("click", hideAlert);
    }
  }
  // end show-alert
  // deleteRecord
  const btnDelete = document.querySelectorAll("[button-delete]");
  if (btnDelete.length > 0) {
    const formDeleteRecord = document.querySelector("#form-delete-record");
    const dataPath = formDeleteRecord.getAttribute("data-path");
    btnDelete.forEach((button) => {
      button.addEventListener("click", () => {
        const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này không ?");
        if (isConfirm) {
          const id = button.getAttribute("data-id");
          const action = `${dataPath}/${id}?_method=DELETE`;
          formDeleteRecord.action = action;
          formDeleteRecord.submit();
        }
      });
    });
  }
  // deleteRecord

  // Form Search
  const formSearch = document.querySelector("#form-search");
  if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
      e.preventDefault();
      const keyword = e.target.elements.keyword.value;
      if (keyword) {
        url.searchParams.set("keyword", keyword);
      } else {
        url.searchParams.delete("keyword");
      }
      window.location.href = url.href;
    });
  }
  // end form search

  const listStatus = document.querySelectorAll("[link-change-status]");
  if (listStatus.length > 0) {
    // lấy form, lấy data-path
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    listStatus.forEach((item) => {
      item.addEventListener("click", () => {
        const statusCurrent = item.getAttribute("data-status");
        const id = item.getAttribute("data-id");
        let statusChanges = statusCurrent == "active" ? "inactive" : "active";
        const action = path + `/${statusChanges}/${id}?_method=PATCH`;
        formChangeStatus.action = action;
        formChangeStatus.submit();
      });
    });
  }
});
