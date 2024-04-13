const permissions = () => {
  const tablePermissions = document.querySelector("[table-permissions");
  if (tablePermissions) {
    const buttonSubmit = document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click", () => {
      let permissions = [];
      const rows = tablePermissions.querySelectorAll("[data-name]");
    });
  }
};

window.onload = () => {
  permissions;
};
