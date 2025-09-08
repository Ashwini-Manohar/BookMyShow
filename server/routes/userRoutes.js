const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const authMiddleware=require("../middlewares/authMiddleware");
const UserModel = require("../models/userModel");
const userRouter = express.Router();
// const User = require("../models/userModel");
const EmailHelper = require("../utils/emailHelper");
const bcrypt = require("bcrypt");

// REGISTER
// routes/userRoutes.js
// userRouter.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, roles } = req.body; // 👈 include roles
//     console.log("Register body:", req.body);

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ success: false, message: "User Already Exists" });
//     }

//     const newUser = new User({
//       name,
//       email,
//       password,          // (optional) hash later
//       roles: roles || "user", // 👈 keep what the client sent, default to user
//       isAdmin: false
//     });

//     await newUser.save();
//     console.log("✅ Saved user:", newUser);

//     res.status(200).json({ success: true, message: "Registration Successful, Please login" });
//   } catch (error) {
//     console.error("❌ Register error:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// // });
// const bcrypt = require("bcrypt");
// const User = require("../models/userModel");

userRouter.post("/register", async (req, res) => {
  try {
    // Check if user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "User already exists, please login",
      });
    }

    // Hash the password
    const saltRounds = 10; // secure but not too slow
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create new user with hashed password
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,          // ✅ store only hashed password
      isAdmin: req.body.isAdmin ?? false,
      roles: req.body.roles || "user",
    });

    await newUser.save();

    res.send({
      success: true,
      message: "Registration Successful, Please login",
      data: newUser,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

async function hashPassword(password) {
console.time("time taken");
const salt = await bcrypt.genSalt(12);
console.log("salt", salt);
const hashedPassword = await bcrypt.hash(password, salt);
console.log("hashedPassword", hashedPassword);
console.timeEnd("time taken");
console.log("***************");
return hashedPassword;
}

// login route
userRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.send({
        success: false,
        message: "User not found. Please register",
      });
    }

    // 🔑 Check password with bcrypt
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.send({
        success: false,
        message: "Invalid Credentials",
      });
    }
const password = "Ayush@123";
hashPassword(password);

    // 🔑 Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.send({
      success: true,
      message: "Login Successful",
      user,          // 👈 send user object
      roles: user.roles,
      data: token,   // 👈 send token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
});



userRouter.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    console.log("User ID from middleware:", req.user.userId); // ✅ use req.user.userId

    const user = await UserModel.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.send({
      success: true,
      message: "You are authorized",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
});

const otpGenerator = function () {
return Math.floor(100000 + Math.random() * 900000);
};
/**
* Math.random(): Generates a random floating-point number between 0 (inclusive) and 1
(exclusive).
Math.random() * 900000: Scales the random number to a range between 0 and 899999.
100000 + Math.random() * 900000: Shifts the range to be between 100000 and 999999.
Math.floor(): Rounds down to the nearest whole number.
*/
userRouter.patch("/forgetpassword", async function (req, res) {
try {
/****
* 1. You can ask for email
* 2. check if email is present or not
* * if email is not present -> send a response to the user(user not found)
* 3. if email is present -> create basic otp -> and send to the email
* 4. also store that otp -> in the userModel
*
* ***/
if (req.body.email == undefined) {
return res.status(401).json({
status: "failure",
message: "Please enter the email for forget Password",
});
}
// find the user -> going db -> getting it for the server
let user = await User.findOne({ email: req.body.email });
if (user == null) {
return res.status(404).json({
status: "failure",
message: "user not found for this email",
});
}
// got the user -> on your server
const otp = otpGenerator();
user.otp = otp;
user.otpExpiry = Date.now() + 10 * 60 * 1000;
// those updates will be send to the db
await user.save();
await EmailHelper("otp.html", user.email, {
name: user.name,
otp: otp,
});
res.status(200).json({
status: "success",
message: "otp sent to your email",
});
// send the mail to there email -> otp
} catch (err) {
res.status(500).json({
message: err.message,
status: "failure",
});
}
// email
});
userRouter.patch("/resetpassword/:email", async function (req, res) {
// -> otp
// newPassword and newConfirmPassword
// -> params -> id
try {
let resetDetails = req.body;
// required fields are there or not
if (!resetDetails.password || !resetDetails.otp) {
return res.status(401).json({
status: "failure",
message: "invalid request",
});
}
// it will serach with the id -> user
const user = await User.findOne({ email: req.params.email });
// if user is not present
if (user == null) {
return res.status(404).json({
status: "failure",
message: "user not found",
});
}
// if otp is expired
if (Date.now() > user.otpExpiry) {
return res.status(401).json({
status: "failure",
message: "otp expired",
});
}
user.password = req.body.password;
// remove the otp from the user
user.otp = undefined;
user.otpExpiry = undefined;
await user.save();
res.status(200).json({
status: "success",
message: "password reset successfully",
});
} catch (err) {
res.status(500).json({
message: err.message,
status: "failure",
});
}
});

module.exports = userRouter;
