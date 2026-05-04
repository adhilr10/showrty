import { logger } from '@/lib/winston';
import Link from '@/models/link';
import User from '@/models/user';

import type { Request, Response } from 'express';

const deleteCurrentUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.userId;
  try {
    await Link.deleteMany({ creator: userId });
    await User.deleteOne({ _id: userId });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({
      code: 'SeverError',
      message: 'Internal server error',
    });
    logger.error('Error during deleting current user', err);
  }
};

export default deleteCurrentUser;
