const SettingGeneral = require("../models/setting-general.model");

module.exports.settingGeneral = async (req, res, next) => {
  try {
    res.locals.settingGeneral = await SettingGeneral.findOne({});
  } catch (error) {
    return next(error);
  }
  next();
};
