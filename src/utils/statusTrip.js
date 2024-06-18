const cron = require("node-cron");
const Booking = require("../models/booking.model");

cron.schedule("0 0 0 * * *", async () => {
  const today = new Date();
  try {
    const bookings = await Booking.find();
    for (const item of bookings) {
      let statusTrip;
      const expectedDate = new Date(item.tourInfo.expectedDate);
      if (today < expectedDate) {
        statusTrip = "Chưa tới ngày đi";
      } else if (today.toDateString() === expectedDate.toDateString()) {
        statusTrip = "Tới ngày đi";
      } else {
        statusTrip = "Đã qua ngày đi";
        await item.save();
        break;
      }

      item.statusTrip = statusTrip;
      console.log("statusTrip");
      await item.save();
    }
  } catch (error) {
    console.error("Error updating tour status:", error);
  }
});
