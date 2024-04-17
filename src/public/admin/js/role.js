window.addEventListener("DOMContentLoaded", () => {
  const tablePermissions = document.querySelector("[table-permissions]");
  if (tablePermissions) {
    const buttonSubmit = document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click", () => {
      let permissions = [];
      const rowPermissions = tablePermissions.querySelectorAll("[data-name]");
      rowPermissions.forEach((row) => {
        const name = row.getAttribute("data-name");
        const inputs = row.querySelectorAll("input");
        if (name == "id") {
          inputs.forEach((input) => {
            const idRole = input.value;
            permissions.push({
              id: idRole,
              permissions: [],
            });
          });
        } else {
          inputs.forEach((input, index) => {
            const checked = input.checked;
            if (checked) {
              permissions[index].permissions.push(name);
            }
          });
        }
      });
      if (permissions.length > 0) {
        const formChangePermissions = document.querySelector(
          "#form-change-permissions"
        );
        const inputPermissions = formChangePermissions.querySelector(
          "input[name='permissions']"
        );
        inputPermissions &&
          (inputPermissions.value = JSON.stringify(permissions));
        formChangePermissions.submit();
      }
    });
  }

  const dataRecords = document.querySelector("[data-records]");
  if (dataRecords) {
    const data = JSON.parse(dataRecords.getAttribute("data-records"));
    const tablePermissions = document.querySelector("[table-permissions]");
    data.forEach((record, index) => {
      const permissions = record.permissions;
      permissions.forEach((permission) => {
        const row = tablePermissions.querySelector(
          `[data-name="${permission}"]`
        );
        const input = row.querySelectorAll("input")[index];
        input.checked = true;
      });
    });
  }
});
