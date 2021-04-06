import { Router } from 'express';
import bcrypt from 'bcrypt';
import Member from '@src/models/member';
import * as jwtUtils from '@src/jwt';
import passport from 'passport';
import { isNotLoggedIn, isLoggedIn } from '@src/middleware';

const router = Router();

// user/login
router.get('/login', isNotLoggedIn, (req, res) => {
  res.render('./user/loginPage');
});

router.get('/register', isNotLoggedIn, (req, res) => {
  res.render('./user/signupPage');
});

router.post('/register', isNotLoggedIn, async (req, res, next) => {
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

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, member, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(member, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

export default router;
