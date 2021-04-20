const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const NotValid = require('../errors/not-valid-data');

const NotAccess = require('../errors/not-access');

const createCard = (req, res, next) => {
  const userId = req.user._id;
  if (!req.body.name || !req.body.link) {
    next(new NotValid('Некорректные данные'));
  }
  const { name, link } = req.body;
  Card.create({ name, link, owner: userId }).then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NotValid('Невалидные данные'));
      } else {
        next(err);
      }
    });
};

const getCards = (req, res, next) => {
  Card.find({}).populate('owner').then((cards) => res.send({ data: cards }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId).select('+owner')
    .orFail(() => new NotFoundError('Карточка с указанным ID не найдена'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new NotAccess('Вы не можете удалить эту карточку');
      } else {
        Card.deleteOne({ _id: cardId })
          .then(() => res.status(200).send({ message: 'Карточка удалена' }));
      }
    })

    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotValid('Невалидное Id'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка с указанным ID не найдена'))
    .then((card) => {
      /* eslint-disable  no-console */
      console.log('like added');
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotValid('Невалидное Id'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка с указанным ID не найдена'))
    .then((card) => {
      /* eslint-disable  no-console */
      console.log('like remove');
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotValid('Невалидное Id'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
