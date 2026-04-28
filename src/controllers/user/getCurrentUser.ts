import { logger } from '@/lib/winston';
import { Request, Response } from 'express';

import User from '@/models/user';

const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select('-__v').lean().exec();

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({
      code: 'SeverError',
      message: 'Internal server error',
    });
    logger.error('Error during get current user', err);
  }
};

export default getCurrentUser;
