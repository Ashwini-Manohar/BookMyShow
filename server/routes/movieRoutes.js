const movieRouter = require("express").Router();
const {
addMovie,
getAllMovies,
updateMovie,
deleteMovie,
getMovieById,
} = require("../controller/movieController");
// Add a Movie
movieRouter.post("/add-movie", addMovie);
// Get all the movies
movieRouter.get("/get-all-movies", getAllMovies);
// Update a movie
// Update a movie
movieRouter.put("/update-movie", updateMovie);
movieRouter.put("/delete-movie", deleteMovie);
movieRouter.get("/movie/:id", getMovieById);

module.exports = movieRouter;
