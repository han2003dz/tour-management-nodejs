const Booking = require("../models/booking.model");

const statistic = async (req, res) => {
  try {
    const bookingsByDate = await Booking.aggregate([
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$tourInfo.expectedDate" },
            month: { $month: "$tourInfo.expectedDate" },
            year: { $year: "$tourInfo.expectedDate" },
          },
          totalBookings: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.day": 1, "_id.month": 1, "_id.year": 1 },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: "%d-%m-%Y",
              date: {
                $dateFromParts: {
                  day: "$_id.day",
                  month: "$_id.month",
                  year: "$_id.year",
                },
              },
            },
          },
          totalBookings: 1,
        },
      },
    ]);

    const chartData = {
      labels: bookingsByDate.map((booking) => booking.date),
      datasets: [
        {
          label: "Total Bookings",
          data: bookingsByDate.map((booking) => booking.totalBookings),
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };

    res.status(200).json({ chartData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching booking statistics" });
  }
};

module.exports = {
  statistic,
};
