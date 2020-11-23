const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { sendToken } = require('../helpers/helpers');
const BadReqestError = require('../errors/BadRequestError');
const ConflictingRequestError = require('../errors/ConflictingRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { badPassword, emailInUse, badEmailOrPassword } = require('../helpers/helpers').errorMessages;

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!password.match(/^[a-zA-Z0-9]{8,}$/)) {
    next(new BadReqestError(badPassword));
  } else {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name, email, password: hash,
      }))
      .then((user) => sendToken(res, user._id))
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
      sendToken(res, userID);
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
