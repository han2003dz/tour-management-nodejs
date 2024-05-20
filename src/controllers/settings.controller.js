const Setting = require("../models/setting-general.model");
const systemConfig = require("../config/system");
const generalPatch = async (req, res) => {
  try {
    const setting = await Setting.findOne({});
    if (setting) {
      await Setting.updateOne(
        {
          _id: setting.id,
        },
        req.body
      );
    } else {
      const data = new Setting(req.body);
      await data.save();
    }
    req.flash("success", "Cập nhật thành công");
    res.redirect(`${systemConfig.prefixAdmin}`);
  } catch (error) {
    req.flash("error", "Cập nhật thất bại!");
    console.log(error);
    res.redirect("back");
  }
};
module.exports = {
  generalPatch,
};
