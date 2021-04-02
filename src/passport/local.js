import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import Member from '@src/models/member';

export default () => {
  passport.use(
    new Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const member = await Member.findOne({
            where: { email },
          });
          if (!member) {
            return done(null, false, { reason: '존재하지 않는 이메일입니다.' }); //서버, 성공, 클라이언트 애러
          }
          const comparePassword = await bcrypt.compare(
            password,
            member.password
          );
          if (comparePassword) {
            return done(null, member);
          }
          return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};

// export default local;
