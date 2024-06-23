const Contact = require("../models/contact.model");

const contactSubmitPost = async (req, res) => {
  const { username, phone, email, notes } = req.body;
  try {
    const contact = new Contact({ username, phone, email, notes });
    await contact.save();
    res.json({ status: "success", message: "Contact received successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Failed to save contact" });
  }
}; 

module.exports = {
  contactSubmitPost,
};
