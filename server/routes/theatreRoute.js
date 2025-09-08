// // // const router = require("express").Router();
// // // const Theatre = require("../models/theatreModel");

// // // router.post("/add-theatre", async (req, res) => {
// // // try {
// // // const newTheatre = new Theatre(req.body);
// // // await newTheatre.save();
// // // res.send({
// // // success: true,
// // // message: "New theatre has been added!",
// // // data:newTheatre
// // // });
// // // } catch (err) {
// // // res.send({
// // // success: false,
// // // message: err.message,
// // // });
// // // }
// // // });
// // // // Update theatre
// // // // router.put("/update-theatre", async (req, res) => {
// // // //   try {
// // // //     const updatedTheatre = await Theatre.findByIdAndUpdate(
// // // //       req.body._id,
// // // //       req.body,
// // // //       { new: true }
// // // //     );
// // // //     res.send({
// // // //       success: true,
// // // //       message: "Theatre updated successfully!",
// // // //       data: updatedTheatre,   // ✅ return updated theatre
// // // //     });
// // // //   } catch (err) {
// // // //     res.send({ success: false, message: err.message });
// // // //   }
// // // // });

// // // // router.put("/update-theatre", async (req, res) => {
// // // // try {
// // // // await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
// // // // // console.log(req.body.theatreId)
// // // // res.send({
// // // // success: true,
// // // // message: "Theatre has been updated!",
// // // // data:Theatre,
// // // // });
// // // // } catch (err) {
// // // // res.send({
// // // // success: false,
// // // // message: err.message,
// // // // });
// // // // }
// // // // });

// // // // Update Theatre
// // // router.put("/update-theatre/:id", async (req, res) => {
// // //   try {
// // //     const theatre = await Theatre.findByIdAndUpdate(
// // //       req.params.id,
// // //       req.body,
// // //       { new: true } // return updated document
// // //     );

// // //     if (!theatre) {
// // //       return res.send({ success: false, message: "Theatre not found" });
// // //     }

// // //     res.send({
// // //       success: true,
// // //       message: "Theatre has been updated!",
// // //       data: theatre, // 👈 return updated theatre
// // //     });
// // //   } catch (err) {
// // //     res.status(500).send({ success: false, message: err.message });
// // //   }
// // // });


// // // // Delete theatre
// // // router.delete("/delete-theatre/:theatreId", async (req, res) => {
// // // try {
// // // console.log("deleting theatre", req.params.theatreId);
// // // await Theatre.findByIdAndDelete(req.params.theatreId);
// // // res.send({
// // // success: true,
// // // message: "The theatre has been deleted!",
// // // });
// // // } catch (err) {
// // // res.send({
// // // success: false,
// // // message: err.message,
// // // });

// // // // Get all theater for admin route
// // // // router.get("/get-all-theatres",async(req,res)=>{
// // // //     try{
// // // //         const allTheatres=await Theatre.find().populate("owner");
// // // //         res.send({
// // // //             success:true,
// // // //             message:"All theatres fetched successfully",
// // // //             data: allTheatres,
// // // //         })
// // // //     }catch(error){
// // // //         return res.status(500).json({success:false, message:error.message});
// // // //     }
// // // // });

// // // // Get the theatres of a specific owner
// // // router.get("/get-all-theatres-by-owner/:ownerId", async (req, res) => {
// // // try {
// // // const allTheatres = await Theatre.find({ owner: req.params.ownerId });
// // // res.send({
// // // success: true,
// // // message: "All theatres fetched successfully!",
// // // data: allTheatres,
// // // });
// // // } catch (err) {
// // // res.send({
// // // success: false,
// // // message: err.message,
// // // });
// // // }
// // // });
// // // }
// // // });
// // // module.exports = router;

// // const router = require("express").Router();
// // const Theatre = require("../models/theatreModel");

// // // ✅ Add theatre
// // router.post("/add-theatre", async (req, res) => {
// //   try {
// //     const newTheatre = new Theatre(req.body);
// //     await newTheatre.save();
// //     res.send({
// //       success: true,
// //       message: "New theatre has been added!",
// //       data: newTheatre,
// //     });
// //   } catch (err) {
// //     res.send({
// //       success: false,
// //       message: err.message,
// //     });
// //   }
// // });

// // // ✅ Update theatre
// // router.put("/update-theatre/:id", async (req, res) => {
// //   try {
// //     const theatre = await Theatre.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { new: true } // return updated document
// //     );

// //     if (!theatre) {
// //       return res.send({ success: false, message: "Theatre not found" });
// //     }

// //     res.send({
// //       success: true,
// //       message: "Theatre has been updated!",
// //       data: theatre,
// //     });
// //   } catch (err) {
// //     res.status(500).send({ success: false, message: err.message });
// //   }
// // });

// // // ✅ Delete theatre
// // router.delete("/delete-theatre/:theatreId", async (req, res) => {
// //   try {
// //     console.log("deleting theatre", req.params.theatreId);
// //     await Theatre.findByIdAndDelete(req.params.theatreId);
// //     res.send({
// //       success: true,
// //       message: "The theatre has been deleted!",
// //     });
// //   } catch (err) {
// //     res.send({
// //       success: false,
// //       message: err.message,
// //     });
// //   }
// // });

// // // ✅ Get all theatres (Admin only)
// // router.get("/get-all-theatres", async (req, res) => {
// //   try {
// //     const theatres = await Theatre.find().populate("owner");
// //     res.send({ success: true, data: theatres });
// //   } catch (err) {
// //     res.send({ success: false, message: err.message });
// //   }
// // });

// // module.exports = router;
// // // ✅ Get all theatres of a specific owner
// // router.get("/get-all-theatres-by-owner/:ownerId", async (req, res) => {
// //   try {
// //     const allTheatres = await Theatre.find({ owner: req.params.ownerId });
// //     res.send({
// //       success: true,
// //       message: "All theatres fetched successfully!",
// //       data: allTheatres,
// //     });
// //   } catch (err) {
// //     res.send({
// //       success: false,
// //       message: err.message,
// //     });
// //   }
// // });

// // module.exports = router;

// const router = require("express").Router();
// const Theatre = require("../models/theatreModel");

// // ✅ Add theatre
// router.post("/add-theatre", async (req, res) => {
//   try {
//     const newTheatre = new Theatre(req.body);
//     await newTheatre.save();
//     res.send({
//       success: true,
//       message: "New theatre has been added!",
//       data: newTheatre,
//     });
//   } catch (err) {
//     res.send({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// // ✅ Update theatre (used for Approve / Block in Admin & editing in Partner)
// router.put("/update-theatre", async (req, res) => {
//   try {
//     const { theatreId, ...updateData } = req.body;

//     if (!theatreId) {
//       return res.send({ success: false, message: "Theatre ID is required" });
//     }

//     const theatre = await Theatre.findByIdAndUpdate(theatreId, updateData, {
//       new: true,
//     }).populate("owner");

//     if (!theatre) {
//       return res.send({ success: false, message: "Theatre not found" });
//     }

//     res.send({
//       success: true,
//       message: "Theatre has been updated!",
//       data: theatre,
//     });
//   } catch (err) {
//     res.status(500).send({ success: false, message: err.message });
//   }
// });

// // ✅ Delete theatre
// router.delete("/delete-theatre/:theatreId", async (req, res) => {
//   try {
//     await Theatre.findByIdAndDelete(req.params.theatreId);
//     res.send({
//       success: true,
//       message: "The theatre has been deleted!",
//     });
//   } catch (err) {
//     res.send({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// // ✅ Get all theatres (Admin dashboard)
// router.get("/get-all-theatres", async (req, res) => {
//   try {
//     const theatres = await Theatre.find().populate("owner");
//     res.send({ success: true, data: theatres });
//   } catch (err) {
//     res.send({ success: false, message: err.message });
//   }
// });

// // ✅ Get all theatres of a specific owner (Partner dashboard)
// router.get("/get-all-theatres-by-owner/:ownerId", async (req, res) => {
//   try {
//     const allTheatres = await Theatre.find({ owner: req.params.ownerId });
//     res.send({
//       success: true,
//       message: "All theatres fetched successfully!",
//       data: allTheatres,
//     });
//   } catch (err) {
//     res.send({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// module.exports = router;

const router = require("express").Router();
const Theatre = require("../models/theatreModel");

// ✅ Add theatre
router.post("/add-theatre", async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    res.send({
      success: true,
      message: "New theatre has been added!",
      data: newTheatre,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

// ✅ Update theatre (works for Admin & Partner)
router.put("/update-theatre", async (req, res) => {
  try {
    // accept either theatreId (Admin) or _id (Partner)
    const theatreId = req.body.theatreId || req.body._id;
    const { theatreId: _, _id, ...updateData } = req.body;

    if (!theatreId) {
      return res.send({ success: false, message: "Theatre ID is required" });
    }

    const theatre = await Theatre.findByIdAndUpdate(
      theatreId,
      updateData,
      { new: true }
    ).populate("owner");

    if (!theatre) {
      return res.send({ success: false, message: "Theatre not found" });
    }

    res.send({
      success: true,
      message: "Theatre has been updated!",
      data: theatre,
    });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

// ✅ Delete theatre
router.delete("/delete-theatre/:theatreId", async (req, res) => {
  try {
    await Theatre.findByIdAndDelete(req.params.theatreId);
    res.send({
      success: true,
      message: "The theatre has been deleted!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

// ✅ Get all theatres (Admin dashboard)
router.get("/get-all-theatres", async (req, res) => {
  try {
    const theatres = await Theatre.find().populate("owner");
    res.send({ success: true, data: theatres });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
});

// ✅ Get all theatres of a specific owner (Partner dashboard)
router.get("/get-all-theatres-by-owner/:ownerId", async (req, res) => {
  try {
    const allTheatres = await Theatre.find({ owner: req.params.ownerId });
    res.send({
      success: true,
      message: "All theatres fetched successfully!",
      data: allTheatres,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
