const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFoundError');
const AccessError = require('../errors/AccessError');

const getMovies = (req, res, next) => {
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
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
  const { id } = req.params;
  const currentUser = req.user._id;

  Movie.findById(id)
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
  getMovies, createMovie, deleteMovie,
};
