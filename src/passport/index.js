import passport from 'passport';
import local from './local';
import Member from '@src/models/member';

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const member = await Member.findOne({
        where: { id },
      });
      done(null, member);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
