import { Router } from 'express';
import bcrypt from 'bcrypt';
import Member from '@src/models/member';
import * as jwtUtils from '@src/jwt';

const router = Router();

// user/login
router.get('/login', (req, res) => {
  res.render('./user/loginPage');
});

router.get('/register', (req, res) => {
  res.render('./user/signupPage');
});

router.post('/register', async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const exMember = await Member.findOne({
      where: {
        email,
      },
    });
    if (exMember) {
      return res.render('index');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await Member.create({
      email,
      name,
      password: hashedPassword,
    });
    res.render('index');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const findMember = await Member.findOne({
      where: {
        email,
      },
    });
    if (!findMember) {
      return res.render('error/errorPage', {
        errorMessage: '존재하지 않는 사용자입니다.',
      });
      // next(new Error('존재하지 않는 사용자입니다.'));
    }
    const comparePassword = await bcrypt.compare(password, findMember.password);
    if (!comparePassword) {
      return res.render('error/errorPage', {
        errorMessage: '비밀번호가 틀렸습니다.',
      });
    }
    // id 받아오는 건 findMember.getDataValue('id)
    const token = jwtUtils.createToken(findMember.getDataValue('id'));
    // localStorage.setItem('jwt', JSON.stringify({ token: token }));
    return res.render('index', {
      token: token,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
