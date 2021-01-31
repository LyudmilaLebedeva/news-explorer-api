const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCurrentUserArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

const URL_PATTERN = /https?:\/\/(((www\.)?[a-z\d][a-z\d-]*\.[a-z]{2,})|(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))((?!:0+)(:([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])))?((\/[a-z\d-]+)*[/#]?)?/;

router.get('/', getCurrentUserArticles);

router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().pattern(URL_PATTERN),
    image: Joi.string().required().pattern(URL_PATTERN),
  }),
}),
createArticle);

router.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24),
  }),
}), deleteArticle);

module.exports = router;
