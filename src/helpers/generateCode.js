const generateOrderCode = (number) => {
  const code = `OD${String(number).padStart(8, "0")}`;
  return code;
};

const generateTourCode = (number) => {
  const code = `TOUR${String(number).padStart(6, "0")}`;
  return code;
};

module.exports = {
  generateOrderCode,
  generateTourCode,
};
