const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.errorMessages = {
  emailInUse: 'Введенный e-mail уже используется',
  badPassword: 'Пароль должен состоять из цифр и латинских букв',
  needAthorization: 'Необходима авторизация',
  badEmailOrPassword: 'Неправильные почта или пароль',
  deleteAnothersArticle: 'Нельзя удалять чужие статьи',
  notFound: 'Запрашиваемый ресурс не найден',
  articleNotFound: 'Нет статьи с таким ID',
};

module.exports.sendToken = (res, userID) => {
  const token = jwt.sign(
    { _id: userID },
    NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    { expiresIn: '7d' },
  );
  res
    .cookie('jwt', token, {
      maxAge: 3600000,
      httpOnly: true,
      sameSite: true,
    })
    .end();
};
