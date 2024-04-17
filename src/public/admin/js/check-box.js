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

const changeMulti = () => {
  // Form-changeMulti
  const formChangeMulti = document.querySelector("[form-change-multi]");
  if (formChangeMulti) {
    console.log("OK");
    formChangeMulti.addEventListener("submit", (e) => {
      e.preventDefault();
      // lấy ra table có element checkbox-multi
      const checkBoxMulti = document.querySelector("[checkbox-multi]");
      // lấy ra các ô checkbox đã check
      const inputsChecked = checkBoxMulti.querySelectorAll(
        "input[name='check-item']:checked"
      );
      const typeChange = e.target.elements.type.value;
      if (typeChange == "deleted-all") {
        const isConfirm = confirm("bạn có chắc chắn muốn xóa tất cả không ?");
        if (!isConfirm) {
          return;
        }
      }

      // nếu người dùng đã check thì mới submit
      if (inputsChecked.length > 0) {
        let arrIds = [];
        const inputIds = formChangeMulti.querySelector("input[name='ids']");
        inputsChecked.forEach((input) => {
          const id = input.value;
          if (typeChange == "change-position") {
            // đi từ ô input đã checked tới thẻ cha tr sau đó từ tr đó query qua input có name=position
            const position = input
              .closest("tr")
              .querySelector("input[name='position']").value;
            arrIds.push(`${id}-${position}`);
          } else {
            arrIds.push(id);
          }
        });
        inputIds.value = arrIds.join(",");
        formChangeMulti.submit();
      } else {
        alert("vui lòng chọn ít nhất 1 bản ghi để áp dụng");
      }
    });
  }
  // End form change multi
};
const formatPrice = () => {
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const prices = document.querySelectorAll("[data-price]");
  if (prices) {
    prices.forEach((price) => {
      const priceToNumber = parseInt(price.value);
      price.value = VND.format(priceToNumber);
    });
  }
};

window.onload = function () {
  checkAll();
  changeMulti();
  formatPrice();
};
