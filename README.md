# mesto-db
### версия 0.0.1

## Описание

Бэкенд-составляющая выпускного проекта в Яндекс.Практикум, целью которого является оценка навыков разработки бэкенд-приложения на Node.js.

## Используемые технологии

- JavaScript
- Node.js
- Express.js
- MongoDB
- API.REST

## Функционал
- запрос на GET /users/me возвращает информацию о пользователе (email и имя);
- GET /articles — все сохранённые пользователем статьи;
- POST /articles создаёт статью с переданными в теле данными;
- DELETE /articles/articleId удаляет сохранённую статью по _id
- POST /signup создаёт пользователя с переданными в теле данными;
- POST /signin возвращает JWT, если в теле запроса переданы правильные почта и пароль.

## Размещение
Приложение размещено на удаленном сервере, к которому можно обратиться по публичному IP-адресу 84.201.156.70, либо по http и по https, используя доменное имя:
- http://api.lyudmila.students.nomoreparties.space
- https://api.lyudmila.students.nomoreparties.space
- http://www.api.lyudmila.students.nomoreparties.space
- https://www.api.lyudmila.students.nomoreparties.space

## Как запустить локально
Локально к серверу можно обратиться по адресу http://localhost:3000
Для запуска используйте команду 
```
npm run start
```
Для запуска в режиме разработки с hot reload используйте команду 
```
npm run dev
```
