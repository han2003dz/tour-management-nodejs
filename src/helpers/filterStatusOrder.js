module.exports = (query) => {
  let filterStatusOrder = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Chưa thanh toán",
      status: "unpaid",
      class: "",
    },
    {
      name: "Đã thanh toán",
      status: "paid",
      class: "",
    },
  ];
  const status = query.status || "";
  const index = filterStatusOrder.findIndex((item) => item.status === status);
  if (index !== -1) {
    filterStatusOrder[index].class = "active";
  }
  return filterStatusOrder;
};
