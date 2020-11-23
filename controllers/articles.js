const Article = require('../models/article');

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owener: req.user,
  })
    .then((article) => res.send(article))
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
        throw new Error();
      }
      if (String(article.owener) !== String(req.user._id)) {
        throw new Error();
      }
      return Article.findByIdAndRemove(req.params.articleId);
    })
    .then((article) => {
      res.send({ message: article });
    })
    .catch(next);
};
