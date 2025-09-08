
// // // const jwt = require("jsonwebtoken");

// // // module.exports = (req, res, next) => {
// // //   try {
// // //     const token = req.header("Authorization")?.replace("Bearer ", "");
// // //     if (!token) {
// // //       return res.status(401).json({ success: false, message: "No token provided" });
// // //     }

// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// // //     req.user = decoded; // ✅ attach decoded { userId } to req.user
// // //     next();
// // //   } catch (error) {
// // //     console.error("Auth error:", error);
// // //     res.status(401).json({ success: false, message: "Invalid or expired token" });
// // //   }
// // // };
// // // server/middlewares/authMiddleware.js
// // const jwt = require("jsonwebtoken");

// // module.exports = (req, res, next) => {
// //   try {
// //     const token = req.header("Authorization")?.replace("Bearer ", "");
// //     if (!token) {
// //       return res.status(401).json({ success: false, message: "No token provided" });
// //     }

// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

// //     // normalize to always have _id
// //     req.user = decoded;
// //     if (!req.user._id && req.user.userId) {
// //       req.user._id = req.user.userId;
// //     }
// //     next();
// //   } catch (error) {
// //     console.error("Auth error:", error);
// //     res.status(401).json({ success: false, message: "Invalid or expired token" });
// //   }
// // };


// // server/middlewares/authMiddleware.js
// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");
//     if (!token) {
//       return res.status(401).json({ success: false, message: "No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // ✅ Normalize user ID for consistency
//     req.user = {
//       _id: decoded._id || decoded.userId, // always use _id internally
//       email: decoded.email,
//       name: decoded.name,
//     };

//     console.log("✅ Authenticated user:", req.user); // debug log

//     next();
//   } catch (error) {
//     console.error("❌ Auth error:", error.message);
//     res.status(401).json({ success: false, message: "Invalid or expired token" });
//   }
// };


// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // normalize user object
    req.user = decoded;
    if (!req.user._id && decoded.userId) {
      req.user._id = decoded.userId;
    }

    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
