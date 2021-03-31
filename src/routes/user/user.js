import { Router } from 'express';
import bcrypt from 'bcrypt';
import Member from '@src/models/member';

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
        email: req.body.email,
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

export default router;
