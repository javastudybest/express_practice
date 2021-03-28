// node js는 commonJS 기반 모듈 시스템 사용 - import 지원 X
// https://www.daleseo.com/js-babel-node/  여기 보고 적용함

import express from 'express';
import ejs from 'ejs';
import path from 'path';

import mainRouter from './routes/main.routes';
import login from './routes/login/loginPage';

const app = express();
const port = 8000;

app.use(express.static('template'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', mainRouter);
app.use('/', login);

app.listen(port, () => {
  console.log(`
    ###################################################
    Server listening on port: ${8000}
    ###################################################
  `);
});
