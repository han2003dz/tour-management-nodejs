const Tours = require("../models/tours.model");

const updateTour = async (req, res) => {
  try {
    const id = req.params.id;
    await Tours.updateOne(
      { _id: id },
      { deleted: false },
      { updatedAt: new Date() }
    );
    req.flash("success", "Cập nhật thành công tour!");
  } catch (error) {
    req.flash("error", "Xóa thất bại!");
    console.log("error delete tour", error);
  } finally {
    res.redirect("back");
  }
};

module.exports = {
  updateTour,
};
