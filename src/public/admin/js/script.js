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
  // deleteRecord
  const btnDelete = document.querySelectorAll("[button-delete]");
  if (btnDelete.length > 0) {
    const formDeleteRecord = document.querySelector("#form-delete-record");
    const dataPath = formDeleteRecord.getAttribute("data-path");
    btnDelete.forEach((button) => {
      button.addEventListener("click", () => {
        Swal.fire({
          title: "Bạn có chắc chắn muốn xóa?",
          text: "Bạn muốn xóa tour này!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Bạn đã xóa thành công",
              icon: "success",
            });
            const id = button.getAttribute("data-id");
            const action = `${dataPath}/${id}?_method=DELETE`;
            formDeleteRecord.action = action;
            formDeleteRecord.submit();
          }
        });
      });
    });
  }
  // deleteRecord

  const btnUpdate = document.querySelectorAll("[button-update]");
  if (btnUpdate.length > 0) {
    const formUpdateRecord = document.querySelector("#form-update-record");
    const dataPath = formUpdateRecord.getAttribute("data-path");
    btnUpdate.forEach((button) => {
      button.addEventListener("click", () => {
        Swal.fire({
          title: "Bạn có chắc chắn muốn cập nhật tour?",
          text: "Bạn muốn cập nhật tour này!",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Updated!",
              text: "Bạn đã cập nhật thành công",
              icon: "success",
            });
            const id = button.getAttribute("data-id");
            const action = `${dataPath}/${id}?_method=PATCH`;
            console.log("OKK");
            formUpdateRecord.action = action;
            formUpdateRecord.submit();
          }
        });
      });
    });
  }

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
        let statusChanges;
        if (statusCurrent === "active" || statusCurrent === "inactive") {
          statusChanges = statusCurrent === "active" ? "inactive" : "active";
        } else {
          statusChanges = statusCurrent === "paid" ? "unpaid" : "paid";
        }
        const action = path + `/${statusChanges}/${id}?_method=PATCH`;
        formChangeStatus.action = action;
        formChangeStatus.submit();
      });
    });
  }
});
