import jwt from 'jsonwebtoken';
import configs from '@src/config/config';
const env = process.env.NODE_ENV || 'development';

const config = configs[env];

export const decode = (token) => {
  try {
    return jwt.verify(token, config.jwt.secretKey);
  } catch (error) {
    throw new Error('토큰이 만료되었습니다.');
  }
};

export const createToken = (memberId) => {
  return jwt.sign(
    {
      memberId,
    },
    config.jwt.secretKey,
    {
      expiresIn: '30m',
      issuer: 'javastudy',
    }
  );
};
