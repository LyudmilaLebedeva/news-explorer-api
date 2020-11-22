const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { sendToken } = require('../helpers/helpers');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  // проверить пароль на пустоту
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => sendToken(res, user._id))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let userID;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Error();
      }
      userID = user._id;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new Error();
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
