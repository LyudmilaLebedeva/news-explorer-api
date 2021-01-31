require('dotenv').config();
const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');
const { needAthorization } = require('../helpers/helpers').errorMessages;

const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  // const token = req.cookies.jwt;

  // if (!token) {
  //   next(new UnauthorizedError(needAthorization));
  //   return;
  // }

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(needAthorization));
    return;
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(needAthorization));
    return;
  }

  req.user = payload;

  next();
};
