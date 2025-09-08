
// models/bookingModel.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    show: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shows",
      required: true, // ✅ must be provided
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true, // ✅ must be provided
    },
    seats: {
      type: [String], // better than just Array
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one seat must be selected",
      },
    },
    transactionId: {
      type: String,
      required: true, // ✅ must exist (from Stripe)
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("bookings", bookingSchema);
