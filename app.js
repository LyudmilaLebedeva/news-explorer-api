const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

const router = require('./routes');
const errorHandeler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/rate-limitter');
const { DATABASE_URL, DATABASE_OPTIONS, PORT } = require('./config');

mongoose.connect(DATABASE_URL, DATABASE_OPTIONS);

const app = express();

app.use('*', cors({
  origin: ['http://localhost:8080', 'https://lyudmilalebedeva.github.io/news-explorer-frontend/'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  allowedHeaders: [
    'Content-Type',
    'origin',
    'x-access-token',
    'authorization',
  ],
  credentials: true,
}));

app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandeler);

app.listen(PORT);
