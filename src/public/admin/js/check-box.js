const checkAll = () => {
  const checkboxMulti = document.querySelector("[checkbox-multi]");
  if (checkboxMulti) {
    const checkAll = document.querySelector(".checkAll");
    const checkItem = checkboxMulti.querySelectorAll(
      "input[name='check-item']"
    );
    checkAll.addEventListener("click", () => {
      if (checkAll.checked) {
        checkItem.forEach((item) => {
          item.checked = true;
        });
      } else {
        checkItem.forEach((item) => {
          item.checked = false;
        });
      }
    });
    checkItem.forEach((item) => {
      item.addEventListener("click", () => {
        const countChecked = checkboxMulti.querySelectorAll(
          "input[name='check-item']:checked"
        ).length;
        if (countChecked == checkItem.length) {
          checkAll.checked = true;
        } else {
          checkAll.checked = false;
        }
      });
    });
  }
};
window.onload = checkAll;
