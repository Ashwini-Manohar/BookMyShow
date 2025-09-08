const router = require("express").Router();
const mongoose = require("mongoose");
const moment = require("moment");
const Show = require("../models/showModel");

// Add Show (normalize fields)
router.post("/add-show", async (req, res) => {
  try {
    const payload = { ...req.body };

    // make sure ids are ObjectId and date is normalized (UTC midnight)
    payload.movie = new mongoose.Types.ObjectId(payload.movie);
    payload.theatre = new mongoose.Types.ObjectId(payload.theatre);
    payload.date = moment.utc(payload.date, "YYYY-MM-DD").startOf("day").toDate();

    const newShow = new Show(payload);
    await newShow.save();

    res.send({ success: true, message: "New show has been added!" });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
});

//delete-show
router.post("/delete-show", async (req, res) => {
try {
await Show.findByIdAndDelete(req.body.showId);
res.send({
success: true,
message: "The show has been deleted!",
});
} catch (err) {
res.send({
status: false,
message: err.message,
});
}
});

// Update mshow
router.put("/update-show", async (req, res) => {
try {
await Show.findByIdAndUpdate(req.body.showId, req.body);
res.send({
success: true,
message: "The show has been updated!",
});
} catch (err) {
res.send({
success: false,
message: err.message,
});
}
});
router.post("/get-all-shows-by-theatre", async (req, res) => {
try {
const shows = await Show.find({ theatre: req.body.theatreId }).populate(
"movie"
);
res.send({
success: true,
message: "All shows fetched",
data: shows,
});
// console.log(req.body, res.data, shows)
} catch (err) {
res.send({
success: false,
message: err.message,
});
}
});

// Get all theatres by movie which has some shows
router.post("/get-all-theatres-by-movie", async (req, res) => {
  try {
    const { movie, date } = req.body;
    if (!movie || !date) {
      return res.send({ success: false, message: "movie and date are required" });
    }

    const movieId = new mongoose.Types.ObjectId(movie);
    const start = moment.utc(date, "YYYY-MM-DD").startOf("day").toDate();
    const end   = moment.utc(date, "YYYY-MM-DD").endOf("day").toDate();

    const shows = await Show.find({
      movie: movieId,
      date: { $gte: start, $lte: end },
    })
      .populate("theatre")
      .lean();

    // group by theatre (works whether populate succeeded or not)
    const theatresById = {};
    for (const show of shows) {
      const theatreId =
        (show.theatre && show.theatre._id && show.theatre._id.toString()) ||
        (show.theatre && show.theatre.toString());

      if (!theatreId) continue;

      if (!theatresById[theatreId]) {
        const theatreDoc = show.theatre?._id ? show.theatre : { _id: show.theatre };
        theatresById[theatreId] = { ...theatreDoc, shows: [] };
      }
      theatresById[theatreId].shows.push(show);
    }

    res.send({
      success: true,
      message: "All theatres fetched!",
      data: Object.values(theatresById),
    });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
});


router.post("/get-show-by-id", async (req, res) => {
try {
const show = await Show.findById(req.body.showId)
.populate("movie")
.populate("theatre");
res.send({
success: true,
message: "Show fetched!",
data: show,
});
} catch (err) {
res.send({
success: false,
message: err.message,
});
}
});
module.exports = router;