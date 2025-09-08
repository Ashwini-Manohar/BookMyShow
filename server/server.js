// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
// const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");

const connectDB = require("./config/db");

// Import routers
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes");
const theatreRouter = require("./routes/theatreRoute");
const showRouter = require("./routes/showRoutes");
const bookingRouter = require("./routes/bookingRoutes");

const app = express();

// ✅ Security middlewares
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
    },
  })
);
app.disable("x-powered-by");

// ✅ Core middlewares
app.use(cors());
app.use(express.json());
app.use("/api/bookings/verify", express.raw({ type: "application/json" })); // For payment verification

// app.use(
//   mongoSanitize({
//     replaceWith: "_",
//   })
// );

// ✅ Connect to MongoDB
connectDB();

// ✅ Rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use("/api/", apiLimiter);

// ✅ API Routes (must be before React fallback)
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);
app.use("/api/shows", showRouter);
app.use("/api/bookings", bookingRouter);

// ✅ Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "🎬 BookMyShow API is running..." });
});

// ✅ Serve React build for frontend routes (fallback)
const clientBuildPath = path.join(__dirname, "../client/build");
app.use(express.static(clientBuildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// ✅ Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
