const { convertToSlug } = require("../../helpers/convertToSlug");
const Tours = require("../../models/tours.model");
const Categories = require("../../models/categories.model");
const { priceNewTours } = require("../../helpers/priceNew");
const result = async (req, res) => {
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
      const toursNews = priceNewTours(tours);
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

module.exports = {
  result,
};
