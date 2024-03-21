window.addEventListener("DOMContentLoaded", (event) => {
  const datatablesSimple = document.getElementById("datatablesSimple");
  if (datatablesSimple) {
    new simpleDatatables.DataTable(datatablesSimple);
    function handleRemoveParentClass(childClasses) {
      childClasses.forEach((childClass) => {
        const elements = document.querySelectorAll(`.${childClass}`);
        elements.forEach((element) => {
          const parent = element.parentNode;
          parent.removeAttribute("class");
        });
      });
    }
    const classesToRemove = ["checkAll", "statusAll", "actionAll", "imageAll"];
    handleRemoveParentClass(classesToRemove);

    const datatableInput = document.querySelector(".datatable-input");
    if (datatableInput) {
      const datatableSearch = datatableInput.parentNode;
      if (datatableSearch) {
        datatableSearch.removeChild(datatableInput);
      }
    }

    const datatableTop = document.querySelector(".datatable-top");
  }
});
