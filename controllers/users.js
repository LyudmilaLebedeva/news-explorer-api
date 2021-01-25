require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadReqestError = require('../errors/BadRequestError');
const ConflictingRequestError = require('../errors/ConflictingRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { badPassword, emailInUse, badEmailOrPassword } = require('../helpers/helpers').errorMessages;

const { JWT_SECRET } = require('../config');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!password.match(/^[a-zA-Z0-9]{8,}$/)) {
    next(new BadReqestError(badPassword));
  } else {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name, email, password: hash,
      }))
      .then((user) => res.status(201).send({ name: user.name, email: user.email }))
      .catch((err) => {
        if (err.name === 'MongoError' && err.code === 11000) {
          next(new ConflictingRequestError(emailInUse));
        } else {
          next(err);
        }
      });
  }
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let userID;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(badEmailOrPassword);
      }
      userID = user._id;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new UnauthorizedError(badEmailOrPassword);
      }

      const token = jwt.sign({ _id: userID }, JWT_SECRET, { expiresIn: '7d' });

      // res
      //   .cookie('jwt', token, {
      //     maxAge: 3600000,
      //     httpOnly: true,
      //     sameSite: false,
      //   })
      //   .end();

      res.send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      res.send({ name: user.name, email: user.email });
    })
    .catch(next);
};
