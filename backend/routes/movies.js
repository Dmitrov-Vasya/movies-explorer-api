const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const {
  getMovies,createMovie,deleteMovie
} = require('../controllers/movies');

const validationUrlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

router.get('/movies', getMovies);
router.post('/movies',celebrate({
    [Segments.BODY]: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.number().required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(validationUrlRegex),
      trailer: Joi.string().required().regex(validationUrlRegex),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().required().regex(validationUrlRegex),
      movieId : Joi.number().required()
    }),
  }),
  createMovie);
  router.delete('/movies/_id ',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      movieId: Joi.string().hex().required(),
    }),
  }), deleteMovie);


module.exports = router;
