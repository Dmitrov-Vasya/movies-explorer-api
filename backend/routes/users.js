const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const {
  getUsersData,updateProfile
} = require('../controllers/users');

router.get('/me', getUsersData);
router.patch(
  '/me',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().required().email(),
    }),
  }),
  updateProfile,
);

module.exports = router;
