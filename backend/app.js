const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { createUser, login } = require('./controllers/users');
const router = require('./routes/routes');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const corsOptions = {
  origin: [
    'https://mesto.full.nomoredomains.monster',
    'http://mesto.full.nomoredomains.monster',
    'https://api.mesto.full.nomoredomains.icu',
    'https://api.mesto.full.nomoredomains.icu',
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowHeaders: ['Origin', 'X-requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());

app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use(router);

app.use(errorLogger);
/* eslint-disable  no-unused-vars */

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  /* eslint-disable  no-console */
  console.log('App start');
});
