const Tours = require("../models/tours.model");
const Categories = require("../models/categories.model");
const Cart = require("../models/cart.model");

const priceNewHelper = require("../helpers/priceNew");
const sortHelper = require("../helpers/sort");
const { convertToSlug } = require("../helpers/convertToSlug");
const paginationHelper = require("../helpers/pagination");

const catchAsync = require("../utils/catchAsync");

const register = catchAsync(async (req, res) => {
  res.render("client/pages/auth/register", {
    pageTitle: "Đăng ký",
  });
});

const login = catchAsync(async (req, res) => {
  res.render("client/pages/auth/login", {
    pageTitle: "Đăng nhập",
  });
});

const home = async (req, res) => {
  try {
    const [toursFeatured, toursNew] = await Promise.all([
      Tours.find({ featured: "1", deleted: false, status: "active" }).limit(6),
      Tours.find({ deleted: false, status: "active" }),
    ]);
    const [newToursFeatured, tours] = await Promise.all([
      priceNewHelper.priceNewTours(toursFeatured),
      priceNewHelper.priceNewTours(toursNew),
    ]);
    res.render("client/pages/home/index", {
      pageTitle: "Trang chủ",
      newToursFeatured,
      tours,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Đã xảy ra lỗi khi tải trang chủ");
  }
};

const priceTable = async (req, res) => {
  try {
    let sort = {};
    sortHelper.addToSort(req, sort);
    const tours = await Tours.find({
      status: "active",
      deleted: false,
    }).sort(sort);
    const newTours = priceNewHelper.priceNewTours(tours);
    res.render("client/pages/priceTable/index", {
      pageTitle: "Bảng giá tours",
      tours: newTours,
    });
  } catch (error) {
    console.log(error);
  }
};

const cart = async (req, res) => {
  try {
    const cartTourId = req.cookies.cartTourId;
    if (cartTourId) {
      const cart = await Cart.findOne({
        _id: cartTourId,
      });
      if (cart.tours.length > 0) {
        for (const item of cart.tours) {
          const tourId = item.tour_id;
          const tour = await Tours.findOne({
            _id: tourId,
          });
          item.tour = tour;
          item.totalPrice =
            item.quantityAdult * tour.priceAdult +
            item.quantityChild * tour.priceChild;
        }
      }
      cart.totalPrice = cart.tours.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
      res.render("client/pages/cart/index", {
        pageTitle: "Giỏ hàng",
        cart,
      });
    } else {
      req.flash("error", "Bạn cần đăng nhập trước khi xem giỏ hàng của mình");
      res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
const updateCart = async (req, res) => {
  try {
    const cartId = req.cookies.cartTourId;
    const tourId = req.params.tourId;
    const { quantityAdult, quantityChild } = req.params;
    const updateFields = {};
    if (quantityAdult) {
      updateFields["tours.$.quantityAdult"] = quantityAdult;
    }
    if (quantityChild) {
      updateFields["tours.$.quantityChild"] = quantityChild;
    }
    await Cart.updateOne(
      {
        _id: cartId,
        "tours.tour_id": tourId,
      },
      {
        $set: updateFields,
      }
    );
  } catch (error) {
    req.flash("error", "Cập nhật thất bại!");
  }
  res.redirect("back");
};

const resultSearch = async (req, res) => {
  try {
    const keyword = `${req.query.keyword}`;
    const type = req.params.type;
    let arrTours = [];
    if (keyword) {
      const keywordRegex = new RegExp(keyword, "i");
      const unicodeSlug = convertToSlug(keyword);
      const slugRegex = new RegExp(unicodeSlug, "i");
      const tours = await Tours.find({
        $or: [{ title: keywordRegex }, { slug: slugRegex }],
      });
      const toursNews = priceNewHelper.priceNewTours(tours);
      if (toursNews.length > 0) {
        for (const tour of toursNews) {
          const infoCategory = await Categories.findOne({
            _id: tour.tour_category_id,
          });
          arrTours.push({
            id: tour.id,
            title: tour.title,
            image: tour.images[0],
            numberOfDays: tour.numberOfDays,
            departureLocation: tour.departureLocation,
            stock: tour.stock,
            slug: tour.slug,
            price: tour.price,
            priceNew: tour.priceNew,
            featured: tour.featured,
            infoCategory: {
              title: infoCategory.title,
            },
          });
        }
      }
    }
    switch (type) {
      case "result":
        res.render("client/pages/search/result", {
          pageTitle: `Kết quả: ${keyword}`,
          keyword: keyword,
          tours: arrTours,
        });
        break;
      case "suggest":
        res.json({
          code: 200,
          message: "Thành công!",
          tours: arrTours,
        });
        break;
      default:
        res.json({
          code: 400,
          message: "Lỗi!",
        });
        break;
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi!",
    });
    res.redirect("back");
  }
};

const listTour = async (req, res) => {
  try {
    const find = {
      status: "active",
      deleted: false,
    };
    const total = await Tours.countDocuments(find);
    let objectPagination = paginationHelper(
      {
        currentPage: 1,
        limitItem: 6,
      },
      req.query,
      total
    );
    const tours = await Tours.find(find)
      .limit(objectPagination.limitItem)
      .skip(objectPagination.skip);

    const newTours = priceNewHelper.priceNewTours(tours);
    res.render("client/pages/tours/index", {
      pageTitle: "Danh sách tours",
      tours: newTours,
      pagination: objectPagination,
    });
  } catch (error) {
    console.log(error);
  }
};

const categoryTourClient = async (req, res) => {
  try {
    const category = await Categories.findOne({
      slug: req.params.slugCategory,
      status: "active",
      deleted: false,
    });
    console.log("OK");
    const tours = await Tours.find({
      tour_category_id: category.id,
      deleted: false,
    });
    const newTours = priceNewHelper.priceNewTours(tours);
    res.render("client/pages/tours/index", {
      pageTitle: category.title,
      tours: newTours,
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

const detailTourClient = async (req, res) => {
  try {
    const find = {
      deleted: false,
      slug: req.params.slugTour,
      status: "active",
    };
    const tour = await Tours.findOne(find);
    if (tour.tour_category_id) {
      const category = await Categories.findOne({
        _id: tour.tour_category_id,
        status: "active",
        deleted: false,
      });
      tour.category = category;
    }
    tour.priceNew = priceNewHelper.priceNewTour(tour);
    res.render("client/pages/tours/detail", {
      pageTitle: tour.title,
      tour,
    });
  } catch (error) {
    res.redirect(`/`);
    console.log(error);
  }
};

module.exports = {
  register,
  login,
  home,
  priceTable,
  cart,
  resultSearch,
  listTour,
  categoryTourClient,
  detailTourClient,
  updateCart,
};
