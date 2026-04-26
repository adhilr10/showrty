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

const generatePasswordResetToken = (payload: ResetLinkPayload) => {
  const resetToken = jwt.sign(payload, config.JWT_PASSWORD_RESET_SECRET, {
    expiresIn: '1h',
  });
  return resetToken;
};

const verifyAccessToken = (accessToken: string): string | JwtPayload => {
  return jwt.verify(accessToken, config.JWT_ACCESS_TOKEN_SECRET);
};

const verifyRefreshToken = (refreshToken: string): string | JwtPayload => {
  return jwt.verify(refreshToken, config.JWT_REFRESH_TOKEN_SECRET);
};

const verifyPasswordResetToken = (resetToken: string): string | JwtPayload => {
  return jwt.verify(resetToken, config.JWT_PASSWORD_RESET_SECRET);
};

export {
  generateAccessToken,
  generateRefreshToken,
  generatePasswordResetToken,
  verifyAccessToken,
  verifyRefreshToken,
  verifyPasswordResetToken,
};
