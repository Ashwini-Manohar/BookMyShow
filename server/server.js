
// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
// const mongoSanitize = require("express-mongo-sanitize");

const connectDB = require("./config/db");

// Import routers
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes");
const theatreRouter = require("./routes/theatreRoute");
const showRouter = require("./routes/showRoutes");
const bookingRouter = require("./routes/bookingRoutes");

const path = require("path");
const app = express();
const clientBuildPath = path.join(__dirname, "../client/build");
console.log(clientBuildPath);
app.use(express.static(clientBuildPath));
app.get("*", (req, res) => {
res.sendFile(path.join(clientBuildPath, "index.html"));
});

// const app = express();

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

// app.use(
//   mongoSanitize({
//     replaceWith: "_", // ✅ prevents "Cannot set property query" error
//   })
// );

// ✅ Core middlewares
app.use(cors());
app.use(express.json());
app.use("/api/bookings/verify", express.raw({ type: "application/json" })); // For payment verification

// ✅ Connect to MongoDB
connectDB();

// ✅ Rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use("/api/", apiLimiter);

// ✅ Routes
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);
app.use("/api/shows", showRouter);
app.use("/api/bookings", bookingRouter);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("🎬 BookMyShow API is running...");
});

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
