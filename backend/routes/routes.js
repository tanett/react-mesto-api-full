const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

const userRouter = require('./users');
const cardRouter = require('./cards');

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('*', (req, res, next) => {
  Promise.reject(new NotFoundError('Страница не найдена'))
    .catch(next);
});

module.exports = router;
