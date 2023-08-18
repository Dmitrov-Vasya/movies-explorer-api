const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } = req.body;
  const owner = req.user._id;

  Card.create({ country,owner, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId })
    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const currentUser = req.user._id;

  Card.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (movie.owner.toString() !== currentUser) {
        throw new AccessError('Доступ запрещен');
      }
      return movie.deleteOne().then(() => res.status(200).send({ data: movie }));
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getMovies,createMovie,deleteMovie
};
