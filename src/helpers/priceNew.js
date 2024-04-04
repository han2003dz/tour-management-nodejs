module.exports.priceNewTours = (tours) => {
  const price = tours.map((item) => {
    item.priceNew = (
      ((item.priceAdult + item.priceChild) * (100 - item.discountPercentage)) /
      100
    ).toFixed(0);
    return item;
  });
  return price;
};

module.exports.priceNewTour = (tour) => {
  const priceNew = (
    ((tour.priceAdult + tour.priceChild) * (100 - tour.discountPercentage)) /
    100
  ).toFixed(0);
  return parseInt(priceNew);
};
