window.addEventListener("DOMContentLoaded", (event) => {
  const inputQuantityAdult = document.querySelectorAll(
    "input[name='quantityAdult']"
  );
  const inputQuantityChild = document.querySelectorAll(
    "input[name='quantityChild']"
  );
  if (inputQuantityAdult.length > 0) {
    inputQuantityAdult.forEach((input) => {
      input.addEventListener("change", (e) => {
        const tourId = input.getAttribute("tour-id");
        const quantityAdult = parseInt(input.value);
        if (quantityAdult > 0) {
          window.location.href = `/cart/updateQuantityAdult/${tourId}/${quantityAdult}`;
        }
      });
    });
  }
  if (inputQuantityChild.length > 0) {
    inputQuantityChild.forEach((input) => {
      input.addEventListener("change", (e) => {
        const tourId = input.getAttribute("tour-id");
        const quantityChild = parseInt(input.value);
        if (quantityChild >= 0) {
          window.location.href = `/cart/updateQuantityChild/${tourId}/${quantityChild}`;
        }
      });
    });
  }
});
