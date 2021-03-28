// node js는 commonJS 기반 모듈 시스템 사용 - import 지원 X
// https://www.daleseo.com/js-babel-node/  여기 보고 적용함

import express from 'express';

import mainRouter from './routes/main.routes';

const app = express();
const port = 8000;

app.use('/', mainRouter);

app.listen(port, () => {
  console.log(`
    ###################################################
    Server listening on port: ${8000}
    ###################################################
  `);
});
