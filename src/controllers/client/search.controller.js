const { convertToSlug } = require("../../helpers/convertToSlug");
const Tours = require("../../models/tours.model");
const Categories = require("../../models/categories.model");
const result = async (req, res) => {
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
    if (tours.length > 0) {
      for (const tour of tours) {
        const infoCategory = await Categories.findOne({
          _id: tour.tour_category_id,
        });
        arrTours.push({
          id: tour.id,
          title: tour.title,
          image: tour.images[0],
          slug: tour.slug,
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
};

module.exports = {
  result,
};
