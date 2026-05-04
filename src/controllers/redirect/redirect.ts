import { logger } from '@/lib/winston';

import Link from '@/models/link';
import User from '@/models/user';

import type { Request, Response } from 'express';

const redirect = async (req: Request, res: Response): Promise<void> => {
  const { backHalf } = req.params;
  try {
    const backHalfExit = await Link.exists({ backHalf }).exec();

    if (!backHalfExit) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Link not found',
      });
      return;
    }
    const link = await Link.findById(backHalfExit._id)
      .select('destination creator totalVisitCount')
      .exec();

    if (!link) return;

    link.totalVisitCount++;
    await link.save();

    const user = await User.findById(link.creator)
      .select('totalVisitCount')
      .exec();

    if (!user) return;
    user.totalVisitCount++;
    await user.save();

    res.redirect(
      link.destination.startsWith('https://')
        ? link.destination
        : `https://${link.destination}`,
    );
  } catch (err) {
    res.status(500).json({
      code: 'SeverError',
      message: 'Internal server error',
    });
    logger.error('Error during redirecting link', err);
  }
};

export default redirect;
