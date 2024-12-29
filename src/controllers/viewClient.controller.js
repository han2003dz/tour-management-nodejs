const Tours = require("../models/tours.model");
const Categories = require("../models/categories.model");
const Cart = require("../models/cart.model");
const User = require("../models/user.model");
const Setting = require("../models/setting-general.model");
const Booking = require("../models/booking.model");
const Review = require("../models/review.model");

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
    const [toursFeatured, toursNew, tourTopLike, topBooking] =
      await Promise.all([
        Tours.find({ featured: "1", deleted: false, status: "active" }).limit(
          6
        ),
        Tours.find({ deleted: false, status: "active" }),
        Tours.find({
          deleted: false,
          status: "active",
        })
          .sort({ like: -1 })
          .limit(6),
        Tours.find({
          deleted: false,
          status: "active",
        }).sort({ bookingCount: -1 }),
      ]);
    const [newToursFeatured, tours] = await Promise.all([
      priceNewHelper.priceNewTours(toursFeatured),
      priceNewHelper.priceNewTours(toursNew),
    ]);
    res.render("client/pages/home/index", {
      pageTitle: "Trang chủ",
      newToursFeatured,
      tours,
      tourTopLike,
      topBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Đã xảy ra lỗi khi tải trang chủ");
  }
};

const priceTable = async (req, res) => {
  try {
    const find = {
      status: "active",
      deleted: false,
    };
    let sort = {};
    sortHelper.addToSort(req, sort);
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
      .sort(sort)
      .limit(objectPagination.limitItem)
      .skip(objectPagination.skip);
    const newTours = priceNewHelper.priceNewTours(tours);
    res.render("client/pages/priceTable/index", {
      pageTitle: "Bảng giá tours",
      tours: newTours,
      pagination: objectPagination,
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
    const keyword = req.query.keyword;
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
    const total = await Review.countDocuments({ tourId: tour.id });
    let objectPagination = paginationHelper(
      {
        currentPage: 1,
        limitItem: 5,
      },
      req.query,
      total
    );
    const reviews = await Review.find({ tourId: tour.id })
      .sort({
        createdAt: -1,
      })
      .limit(objectPagination.limitItem)
      .skip(objectPagination.skip);
    res.render("client/pages/tours/detail", {
      pageTitle: tour.title,
      tour,
      reviews,
      pagination: objectPagination,
    });
  } catch (error) {
    res.redirect(`/`);
    console.log(error);
  }
};

const infoUserClient = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
      isLocked: false,
    }).select("username phone avatar email gender");
    res.render("client/pages/user/info", {
      pageTitle: "Trang cá nhân",
      user,
    });
  } catch (error) {
    req.flash("Bạn chưa đăng nhập");
    res.redirect("back");
  }
};

const booking = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    const cartTourId = req.cookies.cartTourId;
    if (cartTourId) {
      const cart = await Cart.findOne({
        _id: cartTourId,
      });
      let dataOrder = {};
      let deposit = 0;
      for (const item of cart.tours) {
        if (item.tour_id === tourId) {
          const tour = await Tours.findOne({
            _id: tourId,
          }).select(
            "title images slug price discountPercentage priceAdult priceChild"
          );
          const quantityAdult = item.quantityAdult;
          const quantityChild = item.quantityChild;
          const expectedDate = item.expectedDate;
          const totalPrice =
            item.quantityAdult * tour.priceAdult +
            item.quantityChild * tour.priceChild;
          deposit = totalPrice * 0.3;

          dataOrder = {
            tour,
            totalPrice,
            quantityAdult,
            quantityChild,
            expectedDate,
          };
        }
      }
      res.render("client/pages/booking/order.pug", {
        pageTitle: "Thanh toán",
        dataOrder,
        deposit,
      });
    }
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

const onlinePayment = async (req, res) => {
  try {
    res.render("client/pages/booking/online-payment.pug", {
      pageTitle: "Thanh toán online",
    });
  } catch (error) {
    console.log(error);
  }
};

const policy = async (req, res) => {
  try {
    const setting = await Setting.findOne({}).select("policy");
    res.render("client/pages/policy/index", {
      pageTitle: "Trang chính sách",
      setting,
    });
  } catch (error) {
    console.log(error);
  }
};

const history = async (req, res) => {
  try {
    const user_id = req.params.userId;
    const cart = await Cart.findOne({ user_id });
    if (!cart) {
      return res.status(404).send("Cart not found");
    }
    const record = await Booking.find({ cart_id: cart._id, deleted: false });
    console.log(record);
    res.render("client/pages/user/history", {
      pageTitle: "Lịch sử đặt tour",
      record,
    });
  } catch (error) {
    console.log(error);
  }
};

const contact = async (req, res) => {
  try {
    res.render("client/pages/contact/index", {
      pageTitle: "Liên hệ",
    });
  } catch (error) {
    console.log(error);
  }
};

const forgotPassword = async (req, res) => {
  try {
    res.render("client/pages/user/forgot-password", {
      pageTitle: "Quên mật khẩu",
    });
  } catch (error) {
    console.log(error);
  }
};

const otp = async (req, res) => {
  try {
    const email = req.query.email;
    res.render("client/pages/user/otp", {
      pageTitle: "OTP",
      email,
    });
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const email = req.query.email;
    res.render("client/pages/user/reset-password", {
      pageTitle: "Đổi mật khẩu",
      email,
    });
  } catch (error) {
    console.log(error);
  }
};

const lookUpBill = async (req, res) => {
  try {
    res.render("client/pages/user/look-up-bill", {
      pageTitle: "Tra cứu hóa đơn",
    });
  } catch (error) {}
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
  infoUserClient,
  booking,
  onlinePayment,
  policy,
  history,
  contact,
  forgotPassword,
  otp,
  resetPassword,
  lookUpBill,
};
