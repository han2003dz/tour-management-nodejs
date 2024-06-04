const addToSort = (req, sort) => {
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }
};

module.exports = {
  addToSort,
};
