module.exports = (objectPagination, query, totalRecord) => {
  // Lấy trang hiện tại từ tham số truy vấn, mặc định là trang 1
  const currentPage = parseInt(query.page) || 1;

  // Đảm bảo trang hiện tại không nhỏ hơn 1 và không lớn hơn tổng số trang
  const totalPages = Math.ceil(totalRecord / objectPagination.limitItem);
  const validPage = Math.max(1, Math.min(currentPage, totalPages));

  // Tính toán số bản ghi cần bỏ qua để bắt đầu trang hiện tại
  const skip = (validPage - 1) * objectPagination.limitItem;

  // Cập nhật thông tin trang hiện tại và số bản ghi cần bỏ qua vào đối tượng phân trang
  objectPagination.currentPage = validPage;
  objectPagination.skip = skip;
  objectPagination.totalPages = totalPages;

  return objectPagination;
};
