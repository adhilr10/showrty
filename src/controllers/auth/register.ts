import type { Request, Response } from 'express';
import type { IUser } from '@/models/user';
import bcrypt from 'bcrypt';
import { logger } from '@/lib/winston';

import User from '@/models/user';
import config from '@/config';
import { generateMongooseId } from '@/utils';
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt';

type RequestBody = Pick<IUser, 'name' | 'email' | 'password' | 'role'>;

const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body as RequestBody;

  if (role === 'admin' && !config.WHITELISTED_EMAILS?.includes(email)) {
    res.status(400).json({
      code: 'BadRequest',
      message: 'You are not allowed to create an admin account',
    });
    return;
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const userId = generateMongooseId();
    const refreshToken = generateRefreshToken({ userId });
    const accessToken = generateAccessToken({ userId });

    const user = await User.create({
      _id: userId,
      name,
      email,
      password: hashPassword,
      role,
      refreshToken,
    });

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
        passwordResetToken: user.passwordResetToken,
        role: user.role,
      },
      accessToken,
    });
  } catch (err) {
    res.status(500).json({
      code: 'SeverError',
      message: 'Internal server error',
    });
    logger.error('Error during register the user', err);
  }
  res.json({
    name,
    email,
    password: hashPassword,
    role,
  });
};

export default register;
