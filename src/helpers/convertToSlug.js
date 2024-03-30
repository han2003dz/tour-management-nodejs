const unidecode = require("unidecode");

const convertToSlug = (text) => {
  const stringUnidecode = unidecode(text).trim();
  const slug = stringUnidecode.replace(/\s+/g, "-");
  return slug;
};

module.exports = {
  convertToSlug,
};
