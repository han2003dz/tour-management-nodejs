// format-price
const formatPrices = () => {
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const prices = document.querySelectorAll("[data-price]");
  if (prices) {
    prices.forEach((price) => {
      if (price.innerHTML) {
        const priceToNumber = parseInt(price.innerHTML);
        price.innerHTML = VND.format(priceToNumber);
      }
    });
  }
};

window.onload = () => {
  formatPrices();
};
