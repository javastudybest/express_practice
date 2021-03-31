// node js는 commonJS 기반 모듈 시스템 사용 - import 지원 X
// https://www.daleseo.com/js-babel-node/  여기 보고 적용함

import express from 'express';
import ejs from 'ejs';
import path from 'path';

import mainRouter from '@src/routes/main.routes';
import user from '@src/routes/user/user';
import db from '@src/models';

db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('template'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', mainRouter);
app.use('/user', user);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`
    ###################################################
    Server listening on port: ${8000}
    ###################################################
  `);
});
