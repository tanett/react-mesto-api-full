const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');

const userRouter = require('./users');
const cardRouter = require('./cards');

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res, next) => {
  Promise.reject(new NotFoundError('message'))
    .catch(next);
});

module.exports = router;
