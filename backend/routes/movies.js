const router = require('express').Router();

const { validateCreateMovie, validateDeleteMovie } = require('../utils/validate');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post(
  '/',
  validateCreateMovie,
  createMovie,
);

router.delete(
  '/:id',
  validateDeleteMovie,
  deleteMovie,
);

module.exports = router;
