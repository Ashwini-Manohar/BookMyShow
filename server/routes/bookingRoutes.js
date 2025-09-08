// server/routes/bookingRoutes.js
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const authMiddleware = require("../middlewares/authMiddleware");
const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");

/**
 * Create PaymentIntent (Stripe)
 */
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body; // amount in paise (₹1 = 100)
    if (!amount || amount <= 0) {
      return res.status(400).send({ success: false, message: "Invalid amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      payment_method_types: ["card"],
    });

    res.send({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("create-payment-intent error:", error);
    res.status(500).send({ success: false, message: error.message });
  }
});

/**
 * Book Show (after successful payment)
 */
router.post("/book-show", authMiddleware, async (req, res) => {
  try {
    console.log("Book-show body:", req.body);
    console.log("Logged-in user:", req.user);

    const { show: showId, seats, transactionId } = req.body;
    const userId = req.user._id;

    if (!showId || !seats || seats.length === 0 || !transactionId) {
      console.log("Missing data in request");
      return res.status(400).send({ success: false, message: "Missing data" });
    }

    const show = await Show.findById(showId);
    if (!show) {
      console.log("Show not found:", showId);
      return res.status(404).send({ success: false, message: "Show not found" });
    }

    const alreadyBooked = seats.some((seat) => show.bookedSeats.includes(seat));
    if (alreadyBooked) {
      console.log("Seat already booked:", seats);
      return res.status(400).send({
        success: false,
        message: "One or more seats already booked",
      });
    }

    const newBooking = new Booking({
      user: userId,
      show: showId,
      seats,
      transactionId,
    });

    await newBooking.save();
    console.log("Booking saved:", newBooking);

    await Show.findByIdAndUpdate(showId, {
      $push: { bookedSeats: { $each: seats } },
    });
    console.log("Seats updated in show:", seats);

    const populatedBooking = await Booking.findById(newBooking._id)
      .populate("user")
      .populate({
        path: "show",
        populate: [
          { path: "movie", model: "movies" },
          { path: "theatre", model: "theatres" },
        ],
      });

    res.send({
      success: true,
      message: "Booking successful",
      data: populatedBooking,
    });
  } catch (err) {
    console.error("book-show error:", err);
    res.status(500).send({ success: false, message: err.message });
  }
});

/**
 * Get All Bookings for Logged-in User
 */
router.get("/get-all-bookings", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ user: userId })
      .populate({
        path: "show",
        populate: [
          { path: "movie", model: "movies" },
          { path: "theatre", model: "theatres" },
        ],
      });

    res.send({ success: true, data: bookings });
  } catch (error) {
    console.error("get-all-bookings error:", error);
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;
