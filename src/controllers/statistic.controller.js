const Booking = require("../models/booking.model");

const statistic = async (req, res) => {
  try {
    const bookingsByDate = await Booking.aggregate([
      {
        $group: {
          _id: {
            expectedDate: "$tourInfo.expectedDate",
          },
          totalBookings: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.expectedDate": 1 },
      },
      {
        $project: {
          expectedDate: "$_id.expectedDate",
          totalBookings: 1,
          _id: 0,
        },
      },
    ]);

    const chartData = {
      labels: bookingsByDate.map((booking) =>
        booking.expectedDate.toISOString().slice(0, 10)
      ),
      datasets: [
        {
          label: "Số lượng tour đã đặt",
          data: bookingsByDate.map((booking) => booking.totalBookings),
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };

    res.status(200).json({ chartData });
    console.log(chartData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching booking statistics" });
  }
};

module.exports = {
  statistic,
};
