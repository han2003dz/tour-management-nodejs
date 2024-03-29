const Categories = require("../../models/categories.model");
module.exports.category = async (req, res, next) => {
  const toursCategory = await Categories.find({
    deleted: false,
  });

  res.locals.layoutToursCategory = toursCategory;

  next();
};
