const router = require('express').Router();
const signup = require('./signup');
const signin = require('./signin');
const auth = require('../middlewares/auth');
const user = require('./user');
const article = require('./article');
const NotFoundError = require('../errors/NotFounError');
const { notFound } = require('../helpers/helpers').errorMessages;

router.use('/signup', signup);
router.use('/signin', signin);
router.use(auth);
router.use('/users', user);
router.use('/articles', article);

router.use(() => { throw new NotFoundError(notFound); });

module.exports = router;
