module.exports.priceNewTours = (tours) => {
  const price = tours.map((item) => {
    item.priceNew = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed(0);
    return item;
  });
  return price;
};

module.exports.priceNewTour = (tour) => {
  const priceNew = (
    (tour.price * (100 - tour.discountPercentage)) /
    100
  ).toFixed(0);
  return parseInt(priceNew);
};
