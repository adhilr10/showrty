import { generateAccessToken, generateRefreshToken } from '@/lib/jwt';
import { logger } from '@/lib/winston';
import config from '@/config';
import User from '@/models/user';

import type { Request, Response } from 'express';
import type { IUser } from '@/models/user';
type RequestBody = Pick<IUser, 'email'>;

const login = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body as RequestBody;

  try {
    const user = await User.findOne({ email }).exec();
    if (!user) return;
    const refreshToken = generateRefreshToken({ userId: user._id });
    const accessToken = generateAccessToken({ userId: user._id });
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('refreshToken', refreshToken, {
      maxAge: config.COOKIE_MAX_AGE,
      httpOnly: config.NODE_ENV === 'production',
      secure: true,
    });

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      accessToken,
    });
  } catch (err) {
    res.status(500).json({
      code: 'SeverError',
      message: 'Internal server error',
    });
    logger.error('Error during login', err);
  }
};

export default login;
