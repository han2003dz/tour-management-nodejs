const systemConfig = require("../config/system");

const Users = require("../models/user.model");
const Roles = require("../models/role.model");
const Tours = require("../models/tours.model");
const Categories = require("../models/categories.model");
const Booking = require("../models/booking.model");
const Setting = require("../models/setting-general.model");

const filterStatusHelper = require("../helpers/filterStatus");
const filterStatusOrderHelper = require("../helpers/filterStatusOrder");
const searchHelper = require("../helpers/search");
const priceNew = require("../helpers/priceNew");
const statisticHelper = require("../helpers/statistic");
const catchAsync = require("../utils/catchAsync");

const dashboard = async (req, res) => {
  const statistic = {
    categories: await statisticHelper(Categories),
    tours: await statisticHelper(Tours),
    user: await statisticHelper(Users),
    booking: await statisticHelper(Booking),
  };

  res.render("admin/pages/dashboard/index.pug", {
    pageTitle: "Dashboard",
    statistic,
  });
};
const users = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);
  const objectSearch = searchHelper(req.query);
  const find = {
    deleted: false,
    ...(req.query.status && { status: req.query.status }),
    ...(objectSearch.regex && { title: objectSearch.regex }),
  };
  const users = await Users.find(find).select("-password");

  res.render("admin/pages/account/index", {
    pageTitle: "Danh sách tài khoản",
    users,
    filterStatus,
    keyword: objectSearch.keyword,
  });
};
const pageCreateAccount = async (req, res) => {
  try {
    const roles = await Roles.find({
      deleted: false,
    });

    res.render("admin/pages/account/create", {
      pageTitle: "Thêm mới tài khoản",
      roles: roles,
    });
  } catch (error) {
    console.log(error);
  }
};

const tours = async (req, res) => {
  try {
    const filterStatus = filterStatusHelper(req.query);
    const objectSearch = searchHelper(req.query);
    const find = {
      deleted: false,
      ...(req.query.status && { status: req.query.status }),
      ...(objectSearch.regex && { title: objectSearch.regex }),
    };
    const tours = await Tours.find(find);
    const categories = await Categories.find({
      deleted: false,
      status: "active",
    });
    res.render("admin/pages/tour/index.pug", {
      pageTitle: "Tours",
      tours,
      categories,
      filterStatus,
      keyword: objectSearch.keyword,
    });
  } catch (error) {
    console.log(error);
    res.redirect(`${systemConfig.prefixAdmin}`);
  }
};
const pageEditTour = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const tour = await Tours.findOne(find);
    const categories = await Categories.find({ deleted: false });
    res.render("admin/pages/tour/edit.pug", {
      pageTitle: "Chỉnh sửa tour",
      tour,
      categories,
    });
  } catch (error) {
    console.log(error);
  }
};
const pageCreateTour = async (req, res) => {
  try {
    const findCategories = {
      deleted: false,
      status: "active",
    };
    const categories = await Categories.find(findCategories);
    res.render("admin/pages/tour/create.pug", {
      pageTitle: "Thêm mới tour",
      categories,
    });
  } catch (error) {
    console.log(error);
  }
};
const pageDetailTour = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const tour = await Tours.findOne(find);
    tour.priceNew = priceNew.priceNewTour(tour);
    const category = await Categories.findOne({
      _id: tour.tour_category_id,
      deleted: false,
    });
    const categoryName = category.title;
    res.render("admin/pages/tour/detail.pug", {
      pageTitle: tour.title,
      tour,
      categoryName,
    });
  } catch (error) {
    console.log("error detail: ", error);
    req.flash("error", "Không thể xem chi tiết tour này!");
  }
};

const categories = async (req, res) => {
  try {
    const filterStatus = filterStatusHelper(req.query);
    const objectSearch = searchHelper(req.query);
    const find = {
      deleted: false,
      ...(req.query.status && { status: req.query.status }),
      ...(objectSearch.regex && { title: objectSearch.regex }),
    };
    const categories = await Categories.find(find);
    for (const category of categories) {
      const updatedBy = category.updatedBy.slice(-1)[0];
    }
    res.render("admin/pages/category/index.pug", {
      pageTitle: "Danh mục tour",
      categories,
      filterStatus,
      keyword: objectSearch.keyword,
    });
  } catch (error) {
    console.log("error index categories controller: ", error);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
  }
};
const pageEditCategory = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const category = await Categories.findOne(find);
    res.render("admin/pages/category/edit.pug", {
      pageTitle: category.title,
      category,
    });
  } catch (error) {
    console.log("error edit categories controller", error);
    res.redirect(`${systemConfig.prefixAdmin}/categories`);
  }
};
const pageDetailCategory = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const category = await Categories.findOne(find);
    res.render("admin/pages/category/detail.pug", {
      pageTitle: category.title,
      category,
    });
  } catch (error) {
    console.log("error detail categories controller", error);
  }
};
const pageCreateCategory = async (req, res) => {
  try {
    res.render("admin/pages/category/create.pug", {
      pageTitle: "Thêm danh mục",
    });
  } catch (error) {
    console.log("error create categories controller: ", error);
  }
};

const roles = async (req, res) => {
  try {
    const filterStatus = filterStatusHelper(req.query);
    const objectSearch = searchHelper(req.query);
    const find = {
      deleted: false,
      ...(req.query.status && { status: req.query.status }),
      ...(objectSearch.regex && { title: objectSearch.regex }),
    };
    const roles = await Roles.find(find);

    res.render("admin/pages/role/index.pug", {
      pageTile: "Danh sách quyền",
      roles,
      filterStatus,
      keyword: objectSearch.keyword,
    });
  } catch (error) {
    console.log("error: ", error);
    req.flash("error", "Không có quyền truy cập!");
  }
};
const pageCreateRole = async (req, res) => {
  try {
    res.render("admin/pages/role/create", {
      pageTitle: "Thêm quyền",
    });
  } catch (error) {
    req.flash("error", "Không có quyền truy cập!");
    console.log("error: ", error);
  }
};
const pageDetailRole = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const role = await Roles.findOne(find);
    res.render("admin/pages/role/detail.pug", {
      pageTitle: role.title,
      role,
    });
  } catch (error) {
    console.log("error detail categories controller", error);
  }
};
const pageEditRole = async (req, res) => {
  try {
    const id = req.params.id;
    const find = {
      _id: id,
      deleted: false,
    };
    const role = await Roles.findOne(find);
    res.render("admin/pages/role/edit.pug", {
      pageTitle: "Chỉnh sửa quyền",
      role,
    });
  } catch (error) {
    console.log(error);
  }
};
const permissions = async (req, res) => {
  try {
    let find = {
      deleted: false,
    };
    const roles = await Roles.find(find);
    res.render("admin/pages/role/permissions", {
      pageTitle: "Trang phân quyền",
      roles,
    });
  } catch (error) {
    console.log(error);
  }
};

const getTrash = async (req, res) => {
  try {
    let find = { deleted: true };
    const tours = await Tours.find(find);
    res.render("admin/pages/trash/index.pug", {
      pageTitle: "Trash",
      tours,
    });
  } catch (error) {}
};

const login = catchAsync(async (req, res) => {
  res.render("admin/pages/auth/login", {
    pageTitle: "Đăng nhập",
  });
});

const getOrder = async (req, res) => {
  try {
    const filterStatusOrder = filterStatusOrderHelper(req.query);
    const objectSearch = searchHelper(req.query);
    const find = {
      deleted: false,
      ...(req.query.status && { status: req.query.status }),
      ...(objectSearch.regex && { title: objectSearch.regex }),
    };
    const order = await Booking.find(find);
    res.render("admin/pages/booking/index", {
      pageTitle: "Danh sách đơn đặt tour",
      order,
      filterStatusOrder,
      keyword: objectSearch.keyword,
    });
  } catch (error) {
    console.log(error);
  }
};

const general = async (req, res) => {
  try {
    const settingGeneral = await Setting.findOne({});
    res.render("admin/pages/settings/general", {
      pageTitle: "Cài đặt chung",
      settingGeneral,
    });
  } catch (error) {
    console.log(error);
  }
};

const statistic = async (req, res) => {
  try {
    res.render("admin/pages/statistic/index", {
      pageTitle: "Thống kê số liệu",
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  dashboard,
  users,
  pageCreateAccount,
  tours,
  pageEditTour,
  pageCreateTour,
  pageDetailTour,
  categories,
  pageEditCategory,
  pageDetailCategory,
  pageCreateCategory,
  roles,
  pageCreateRole,
  pageDetailRole,
  pageEditRole,
  permissions,
  getOrder,
  login,
  general,
  statistic,
  getTrash,
};
