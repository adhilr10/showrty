import jwt from 'jsonwebtoken';

import config from '@/config';
import type { Types } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

export type TokenPayload = { userId: Types.ObjectId };

export type ResetLinkPayload = { email: string };

const generateAccessToken = (payload: TokenPayload) => {
  const token = jwt.sign(payload, config.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: '30m',
  });
  return token;
};

const generateRefreshToken = (payload: TokenPayload) => {
  const token = jwt.sign(payload, config.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
  return token;
};

//verify access token
const verifyAccessToken = (accessToken: string): string | JwtPayload => {
  return jwt.verify(accessToken, config.JWT_ACCESS_TOKEN_SECRET);
};

//verify refresh token
const verifyRefreshToken = (refreshToken: string): string | JwtPayload => {
  return jwt.verify(refreshToken, config.JWT_REFRESH_TOKEN_SECRET);
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
