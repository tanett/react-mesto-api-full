const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле обязательно'],
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: [true, 'Поле обязательно'],
      validate: {

        validator: (v) => {
          const regexp = /https?:\/\/\S+#?$/gi; /// ^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w\W.-]*)#?$/g
          return regexp.test(v);
        },
        message: 'Поле "link" должно быть валидной ссылкой на картинку',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      default: [],
      ref: 'user',
      required: true,
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
);

module.exports = mongoose.model('card', cardSchema);
