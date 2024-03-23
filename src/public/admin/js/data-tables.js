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

    // remove form search in table
    const datatableInput = document.querySelector(".datatable-input");
    if (datatableInput) {
      const datatableSearch = datatableInput.parentNode;
      if (datatableSearch) {
        datatableSearch.removeChild(datatableInput);
      }
    }

    // format-price
    const formatPrice = () => {
      const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      const prices = document.querySelectorAll("[data-price]");
      prices.forEach((price) => {
        const priceToNumber = parseInt(price.innerHTML);
        price.innerHTML = VND.format(priceToNumber);
      });
    };
    formatPrice();
  }
});
