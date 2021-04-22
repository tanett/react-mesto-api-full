const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const NotValid = require('../errors/not-valid-data');
const NotAuth = require('../errors/not-auth');

const getUsers = (req, res, next) => {
  User.find({}).then((users) => res.send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)

    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotValid('Невалидные данные'));
      }
      next(err);

      // if (err.name === 'CastError') {
      //   res.status(400).send({message: 'Невалидные данные'});
      // } else if (err.message === 'Пользователь не найден') {
      //   res.status(404).send({message: 'Пользователь не найден'});
      // } else {
      //   res.status(500).send({message: 'Произошла ошибка'});
      // }
    });
};

const getUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })

    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotValid('Невалидные данные'));
      }
      next(err);
    });

  // .orFail(() => new Error('Пользователь не найден'))
  // .then((user) => {
  //   res.send(user);
  // })
  // .catch((err) => {
  //   if (err.name === 'CastError') {
  //     res.status(400).send({ message: 'Невалидные данные' });
  //   } else if (err.message === '') {
  //     res.status(404).send({ message: 'Пользователь не найден' });
  //   } else {
  //     res.status(500).send({ message: 'Произошла ошибка' });
  //   }
  // });
};

const createUser = (req, res, next) => {
  // User.findOne({email: req.body.email})
  //   .then(user=> {
  //     if(user){
  //       throw new Error({message:'Такой емайл уже зарегестрирован', statusCode: 409})
  //     }
  //   })
  //   .catch(err =>next(err));
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      User.findOne({ _id: user._id }).then((userNoPassword) => res.send(userNoPassword));
    })
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        const error = new Error('Такой емайл уже зарегестрирован');
        error.statusCode = 409;
        next(error);
      } else
      if (err.name === 'ValidationError') {
        next(new NotValid('Невалидные данные'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key',
        { expiresIn: '7d' });

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
          credentials: true,
        })
        .end();
    })
    .catch((err) => {
      if (err.message === 'Неправильные почта или пароль') {
        next(new NotAuth(err.message));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  if (!req.body.name || !req.body.about) {
    next(new NotValid('Некорректные данные'));
  }
  User.findByIdAndUpdate(req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true })
    .orFail(() => new Error())
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NotValid(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  if (!req.body.avatar) {
    next(new NotValid('Некорректные данные'));
  }
  User.findByIdAndUpdate(req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true })
    .orFail(() => new Error())
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NotValid(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  login,
  updateUser,
  updateAvatar,
  getUser,
};
