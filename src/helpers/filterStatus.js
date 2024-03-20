module.exports = (query) => {
  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    },
  ];
  const status = query.status || "";
  const index = filterStatus.findIndex((item) => item.status === status);
  if (index !== -1) {
    filterStatus[index].class = "active";
  }
  return filterStatus;
};
