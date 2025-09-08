// // // const router = require("express").Router();
// // // const stripe = require("stripe")(process.env.STRIPE_KEY);
// // // const authMiddleware = require("../middlewares/authMiddleware");
// // // const Booking = require("../models/bookingModel");
// // // const Show = require("../models/showModel");
// // // // router.post("/make-payment", authMiddleware, async (req, res) => {
// // // // try {
// // // // const { token, amount } = req.body;
// // // // const customer = await stripe.customers.create({
// // // // email: token.email,
// // // // source: token.id,
// // // // });
// // // // const paymentIntent = await stripe.paymentIntents.create({
// // // // amount: amount,
// // // // currency: "usd",
// // // // customer: customer.id,
// // // // payment_method_types: ["card"],
// // // // receipt_email: token.email,
// // // // description: "Token has been assigned to the movie!",
// // // // });
// // // // const transactionId = paymentIntent.id;
// // // // res.send({
// // // // success: true,
// // // // message: "Payment processing. You will receive a confirmation once the payment is complete",
// // // // data: transactionId,
// // // // });
// // // // } catch (err) {
// // // // res.send({
// // // // success: false,
// // // // message: err.message,
// // // // });
// // // // }
// // // // });
// // // router.post("/create-payment-intent", async (req, res) => {
// // //   try {
// // //     const { amount } = req.body; // amount in cents

// // //     const paymentIntent = await stripe.paymentIntents.create({
// // //       amount,
// // //       currency: "usd",
// // //       payment_method_types: ["card"],
// // //     });

// // //     res.send({
// // //       clientSecret: paymentIntent.client_secret,
// // //     });
// // //   } catch (error) {
// // //     console.error(error);
// // //     res.status(500).send({ error: error.message });
// // //   }
// // // });

// // // router.post("/make-payment", authMiddleware, async (req, res) => {
// // //   try {
// // //     const { amount } = req.body;

// // //     // Create PaymentIntent
// // //     const paymentIntent = await stripe.paymentIntents.create({
// // //       amount: amount * 100, // Stripe works in cents
// // //       currency: "usd",
// // //       automatic_payment_methods: { enabled: true },
// // //     });

// // //     res.send({
// // //       success: true,
// // //       clientSecret: paymentIntent.client_secret,
// // //     });
// // //   } catch (err) {
// // //     res.send({
// // //       success: false,
// // //       message: err.message,
// // //     });
// // //   }
// // // });

// // // // Create a booking after the payment
// // // router.post("/book-show", authMiddleware, async (req, res) => {
// // // try {
// // // const newBooking = new Booking(req.body);
// // // await newBooking.save();
// // // const show = await Show.findById(req.body.show).populate("movie");
// // // const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
// // // await Show.findByIdAndUpdate(req.body.show, {
// // // bookedSeats: updatedBookedSeats,
// // // });
// // // res.send({
// // // success: true,
// // // message: "New Booking done!",
// // // data: newBooking,
// // // });
// // // } catch (err) {
// // // res.send({
// // // success: false,
// // // message: err.message,
// // // });
// // // }
// // // });
// // // // router.get("/get-all-bookings", authMiddleware, async (req, res) => {
// // // // try {
// // // // const bookings = await Booking.find({ user: req.body.userId })
// // // // .populate("user")
// // // // .populate("show")
// // // // .populate({
// // // // path: "show",
// // // // populate: {
// // // // path: "movie",
// // // // model: "movies",
// // // // },
// // // // })
// // // // .populate({
// // // // path: "show",
// // // // populate: {
// // // // path: "theatre",
// // // // model: "theatres",
// // // // },
// // // // });
// // // // res.send({
// // // // success: true,
// // // // message: "Bookings fetched!",
// // // // data: bookings,
// // // // });
// // // // } catch (err) {
// // // // res.send({
// // // // success: false,
// // // // message: err.message,
// // // // });
// // // // }
// // // // });

// // // router.get("/get-all-bookings", authMiddleware, async (req, res) => {
// // //   try {
// // //     const bookings = await Booking.find({ user: req.user._id })  // <- from token
// // //       .populate("user")
// // //       .populate("show")
// // //       .populate({
// // //         path: "show",
// // //         populate: { path: "movie", model: "movies" },
// // //       })
// // //       .populate({
// // //         path: "show",
// // //         populate: { path: "theatre", model: "theatres" },
// // //       });

// // //     res.send({ success: true, message: "Bookings fetched!", data: bookings });
// // //   } catch (err) {
// // //     res.send({ success: false, message: err.message });
// // //   }
// // // });

// // // module.exports = router;

// // const router = require("express").Router();
// // const stripe = require("stripe")(process.env.STRIPE_KEY);
// // const authMiddleware = require("../middlewares/authMiddleware");
// // const Booking = require("../models/bookingModel");
// // const Show = require("../models/showModel");
// // const EmailHelper = require("../utils/emailHelper");
// // /**
// //  * Create PaymentIntent (Stripe)
// //  */

// // router.post("/create-payment-intent", async (req, res) => {
// //   try {
// //     const { amount } = req.body; // amount in cents
// //     const paymentIntent = await stripe.paymentIntents.create({
// //       amount,
// //       currency: "usd",
// //     });

// //     res.send({
// //       success: true,
// //       clientSecret: paymentIntent.client_secret,
// //     });
// //   } catch (error) {
// //     res.status(500).send({ success: false, message: error.message });
// //   }
// // });
// // // router.post("/create-payment-intent", authMiddleware, async (req, res) => {
// // //   try {
// // //     const { amount } = req.body;

// // //     const paymentIntent = await stripe.paymentIntents.create({
// // //       amount: amount * 100, // Stripe accepts amounts in **paise** (₹1 = 100 paise)
// // //       currency: "inr",
// // //       automatic_payment_methods: { enabled: true },
// // //     });

// // //     res.send({
// // //       success: true,
// // //       clientSecret: paymentIntent.client_secret,
// // //     });
// // //   } catch (error) {
// // //     console.error(error);
// // //     res.send({ success: false, message: error.message });
// // //   }
// // // });

// // /**
// //  * Save booking AFTER payment is confirmed
// //  */
// // router.post("/book-show", authMiddleware, async (req, res) => {
// //   try {
// //     const newBooking = new Booking(req.body);
// //     await newBooking.save();

// //     // update booked seats
// //     const show = await Show.findById(req.body.show).populate("movie");
// //     const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];

// //     await Show.findByIdAndUpdate(req.body.show, {
// //       bookedSeats: updatedBookedSeats,
// //     });
// //     // adding more details to the booking
// // const populatedBooking = await Booking.findById(newBooking._id)
// // .populate("user")
// // .populate("show")
// // .populate({
// // path: "show",
// // populate: {
// // path: "movie",
// // model: "movies",
// // },
// // })
// // .populate({
// // path: "show",
// // populate: {
// // path: "theatre",
// // model: "theatre",
// // },
// // });
// // console.log("this is populated Booking", populatedBooking);
// // // console.log(populatedBooking.user.email);
// // await EmailHelper("ticketTemplate.html", populatedBooking.user.email, {
// // name: populatedBooking.user.name,
// // movie: populatedBooking.show.movie.title,
// // theatre: populatedBooking.show.theatre.name,
// // date: populatedBooking.show.date,
// // time: populatedBooking.show.time,
// // seats: populatedBooking.seats,
// // amount: populatedBooking.seats.length * populatedBooking.show.ticketPrice,
// // transactionId: populatedBooking.transactionId,
// // });
// // res.send({
// // success: true,
// // message: "New Booking done!",
// // data: populatedBooking,
// // });
// // } catch (err) {
// // console.log(err);
// // res.send({
// // success: false,
// // message: "Failed to book show",
// // });
// // }
// //   //   res.send({
// //   //     success: true,
// //   //     message: "New Booking done!",
// //   //     data: newBooking,
// //   //   });
// //   // } catch (err) {
// //   //   res.send({
// //   //     success: false,
// //   //     message: err.message,
// //   //   });
// //   // }
// // });

// // /**
// //  * Get all bookings for logged-in user
// //  */
// // // router.get("/get-all-bookings", authMiddleware, async (req, res) => {
// // //   try {
// // //     const bookings = await Booking.find({ user: req.user._id })
// // //       .populate("user")
// // //       .populate({
// // //         path: "show",
// // //         populate: { path: "movie", model: "movies" },
// // //       })
// // //       .populate({
// // //         path: "show",
// // //         populate: { path: "theatre", model: "theatres" },
// // //       });

// // //     res.send({
// // //       success: true,
// // //       message: "Bookings fetched!",
// // //       data: bookings,
// // //     });
// // //   } catch (err) {
// // //     res.send({
// // //       success: false,
// // //       message: err.message,
// // //     });
// // //   }
// // // });


// // router.get("/get-all-bookings", authMiddleware, async (req, res) => {
// //   try {
// //     const bookings = await Booking.find({ user: req.userId })
// //       .populate("show")
// //       .populate({
// //         path: "show",
// //         populate: [
// //           { path: "movie", model: "movies" },
// //           { path: "theatre", model: "theatres" },
// //         ],
// //       });

// //     res.send({ success: true, data: bookings });
// //   } catch (error) {
// //     res.send({ success: false, message: error.message });
// //   }
// // });

// // module.exports = router;

// // // server/routes/bookingRoutes.js
// // const router = require("express").Router();
// // const stripe = require("stripe")(process.env.STRIPE_KEY);
// // const authMiddleware = require("../middlewares/authMiddleware");
// // const Booking = require("../models/bookingModel");
// // const Show = require("../models/showModel");
// // const EmailHelper = require("../utils/emailHelper");

// // // Create PaymentIntent (frontend sends amount in paise)
// // router.post("/create-payment-intent", async (req, res) => {
// //   try {
// //     const { amount } = req.body; // e.g. Rs.100 => amount = 10000 (paise)
// //     if (!amount || amount <= 0) {
// //       return res.status(400).send({ success: false, message: "Invalid amount" });
// //     }
// //     const paymentIntent = await stripe.paymentIntents.create({
// //       amount,
// //       currency: "inr",
// //       payment_method_types: ["card"],
// //     });

// //     res.send({
// //       success: true,
// //       clientSecret: paymentIntent.client_secret,
// //       paymentIntentId: paymentIntent.id,
// //     });
// //   } catch (error) {
// //     console.error("create-payment-intent error:", error);
// //     res.status(500).send({ success: false, message: error.message });
// //   }
// // });

// // // Book show after payment confirmed (requires auth)
// // router.post("/book-show", authMiddleware, async (req, res) => {
// //   try {
// //     const { show: showId, seats, transactionId } = req.body;
// //     // const userId = req.user && (req.user._id || req.user.userId || req.userId);
// //     const userId = req.user._id;
// //     if (!showId || !seats || seats.length === 0 || !transactionId) {
// //       return res.status(400).send({ success: false, message: "Missing data" });
// //     }

// //     const newBooking = new Booking({
// //       user: userId,
// //       show: showId,
// //       seats,
// //       transactionId,
// //     });

// //     await newBooking.save();

// //     // update booked seats on show
// //     const show = await Show.findById(showId);
// //     const updatedBookedSeats = [...(show.bookedSeats || []), ...seats];
// //     await Show.findByIdAndUpdate(showId, { bookedSeats: updatedBookedSeats });

// //     const populatedBooking = await Booking.findById(newBooking._id)
// //       .populate("user")
// //       .populate({
// //         path: "show",
// //         populate: [
// //           { path: "movie", model: "movies" },
// //           { path: "theatre", model: "theatres" },
// //         ],
// //       });

// //     // optionally send email...
// //     // await EmailHelper("ticketTemplate.html", populatedBooking.user.email, {...});

// //     res.send({ success: true, message: "Booking created", data: populatedBooking });
// //   } catch (err) {
// //     console.error("book-show error:", err);
// //     res.status(500).send({ success: false, message: err.message });
// //   }
// // });

// // // Get all bookings for logged-in user
// // router.get("/get-all-bookings", authMiddleware, async (req, res) => {
// //   try {
// //     // const userId = req.user && (req.user._id || req.user.userId || req.userId);
// //     const userId = req.user._id;
// //     const bookings = await Booking.find({ user: userId })
// //       .populate({
// //         path: "show",
// //         populate: [
// //           { path: "movie", model: "movies" },
// //           { path: "theatre", model: "theatres" },
// //         ],
// //       });

// //     res.send({ success: true, data: bookings });
// //   } catch (error) {
// //     console.error("get-all-bookings error:", error);
// //     res.status(500).send({ success: false, message: error.message });
// //   }
// // });

// // module.exports = router;

// // server/routes/bookingRoutes.js
// const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
// const authMiddleware = require("../middlewares/authMiddleware");
// const Booking = require("../models/bookingModel");
// const Show = require("../models/showModel");
// const EmailHelper = require("../utils/emailHelper");

// router.post("/create-payment-intent", async (req, res) => {
//   try {
//     const { amount } = req.body; // amount (IN PAISA) e.g. Rs 100 => 10000
//     if (!amount || amount <= 0) {
//       return res.status(400).send({ success: false, message: "Invalid amount" });
//     }
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: "inr",
//       payment_method_types: ["card"],
//     });

//     res.send({
//       success: true,
//       clientSecret: paymentIntent.client_secret,
//       paymentIntentId: paymentIntent.id,
//     });
//   } catch (error) {
//     console.error("create-payment-intent error:", error);
//     res.status(500).send({ success: false, message: error.message });
//   }
// });

// router.post("/book-show", authMiddleware, async (req, res) => {
//   try {
//     const { show: showId, seats, transactionId } = req.body;
//     const userId = req.user._id;

//     if (!showId || !seats || seats.length === 0 || !transactionId) {
//       return res.status(400).send({ success: false, message: "Missing data" });
//     }

//     const newBooking = new Booking({
//       user: userId,
//       show: showId,
//       seats,
//       transactionId,
//     });

//     await newBooking.save();

//     // update booked seats on show
//     const show = await Show.findById(showId);
//     const updatedBookedSeats = [...(show.bookedSeats || []), ...seats];
//     await Show.findByIdAndUpdate(showId, { bookedSeats: updatedBookedSeats });

//     const populatedBooking = await Booking.findById(newBooking._id)
//       .populate("user")
//       .populate({
//         path: "show",
//         populate: [
//           { path: "movie", model: "movies" },
//           { path: "theatre", model: "theatres" },
//         ],
//       });

//     res.send({ success: true, message: "Booking created", data: populatedBooking });
//   } catch (err) {
//     console.error("book-show error:", err);
//     res.status(500).send({ success: false, message: err.message });
//   }
// });

// router.get("/get-all-bookings", authMiddleware, async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const bookings = await Booking.find({ user: userId })
//       .populate({
//         path: "show",
//         populate: [
//           { path: "movie", model: "movies" },
//           { path: "theatre", model: "theatres" },
//         ],
//       });

//     res.send({ success: true, data: bookings });
//   } catch (error) {
//     console.error("get-all-bookings error:", error);
//     res.status(500).send({ success: false, message: error.message });
//   }
// });

// module.exports = router;

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
