import { logger } from '@/lib/winston';

import User from '@/models/user';

import type { Request, Response, NextFunction } from 'express';
type Role = 'user' | 'admin';

const authorization = (role: Role[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({
        code: 'AccessTokenError',
        message: 'Access token is required',
      });
      return;
    }

    try {
      const user = await User.findById(userId).select('role').lean().exec();
      if (!user) {
        res.status(403).json({
          code: 'AuthorizationError',
          message: `You don't have an account`,
        });
        return;
      }
      if (!role.includes(user.role)) {
        res.status(403).json({
          code: 'AuthorizationError',
          message: `Unauthorized access`,
        });
        return;
      }
      next();
    } catch (err) {
      res.status(500).json({
        code: 'SeverError',
        message: 'Internal server error',
      });
      logger.error('Error during authorization', err);
    }
  };
};

export default authorization;
