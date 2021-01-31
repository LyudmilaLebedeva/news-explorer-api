const Article = require('../models/article');
const NotFoundError = require('../errors/NotFounError');
const ForbiddenError = require('../errors/ForbiddenError');
const { articleNotFound, deleteAnothersArticle } = require('../helpers/helpers').errorMessages;

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owener: req.user,
  })
    .then((article) => res.status(201).send({
      id: article._id,
    }))
    .catch(next);
};

module.exports.getCurrentUserArticles = (req, res, next) => {
  Article.find({ owener: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owener')
    .then((article) => {
      if (!article) {
        throw new NotFoundError(articleNotFound);
      }
      if (String(article.owener) !== String(req.user._id)) {
        throw new ForbiddenError(deleteAnothersArticle);
      }
      return Article.findByIdAndRemove(req.params.articleId);
    })
    .then((article) => res.send({
      keyword: article.keyword,
      title: article.title,
      text: article.text,
      date: article.date,
      source: article.source,
      link: article.link,
      image: article.image,
    }))
    .catch(next);
};
