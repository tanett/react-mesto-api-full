const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');
const {
  getUsers, getUserById, updateUser, updateAvatar, getUser,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().required().length(24),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helper) => {
      if (isUrl(value, { require_protocol: true })) {
        return value;
      }
      return helper.message('Некорректный адрес изображения');
    }),
  }),
}), updateAvatar);

module.exports = router;
