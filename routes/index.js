const router = require('express').Router();
const signup = require('./signup');
const signin = require('./signin');
const auth = require('../middlewares/auth');
const user = require('./user');

router.use('/signup', signup);
router.use('/signin', signin);
router.use(auth);
router.use('/users', user);

module.exports = router;
