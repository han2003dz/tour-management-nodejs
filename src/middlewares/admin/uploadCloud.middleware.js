const uploadToCloudinary = require("../../helpers/uploadToCloudinary");
module.exports.uploadSingle = async (req, res, next) => {
  try {
    const result = await uploadToCloudinary(req["file"].buffer);

    req.body[req["file"].fieldname] = result;
  } catch (error) {
    console.log(error);
  }
  next();
};
module.exports.uploadFields = async (req, res, next) => {
  try {
    for (const key in req["files"]) {
      req.body[key] = [];
      const array = req["files"][key];
      for (const item of array) {
        try {
          const result = await uploadToCloudinary(item.buffer);
          req.body[key].push(result);
        } catch (error) {
          console.log(error);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
  next();
};
