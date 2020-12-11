require('dotenv').config();

const { NODE_ENV, PORT = 3000 } = process.env;

const DEV_MODE_CONSTANTS = {
  DATABASE_URL: 'mongodb://localhost:27017/news-db',
  JWT_SECRET: 'blablabla',
};

const { DATABASE_URL, JWT_SECRET } = NODE_ENV === 'production'
  ? process.env
  : DEV_MODE_CONSTANTS;

const DATABASE_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = {
  DATABASE_OPTIONS,
  DATABASE_URL,
  JWT_SECRET,
  PORT,
};
