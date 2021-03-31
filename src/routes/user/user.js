import { Router } from 'express';
const router = Router();

// user/login
router.get('/login', (req, res) => {
  res.render('./user/loginPage');
});

router.get('/register', (req, res) => {
  res.render('./user/signupPage');
});

export default router;
