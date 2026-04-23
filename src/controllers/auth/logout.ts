import config from '@/config';
import { logger } from '@/lib/winston';
import User from '@/models/user';

import type { Request, Response } from 'express';

const logout = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId;
  try {
    await User.updateOne({ _id: userId }, { refreshToken: null });
    res.clearCookie('refreshToken', {
        maxAge: config.COOKIE_MAX_AGE,
        httpOnly: config.NODE_ENV === 'production',
        secure: true
    })
    res.sendStatus(204)
  } catch (err) {
    res.status(500).json({
      code: 'SeverError',
      message: 'Internal server error',
    });
    logger.error('Error during logout', err);
  }
};

export default logout;
