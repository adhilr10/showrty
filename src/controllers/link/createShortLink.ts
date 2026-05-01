import { logger } from '@/lib/winston';
import config from '@/config';
import Link from '@/models/link';

import type { Request, Response } from 'express';
import type { ILink } from '@/models/link';
import { generateBackHalf } from '@/utils';
type RequestBody = Pick<ILink, 'title' | 'destination' | 'backHalf'>;

const createShortLink = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId;
  const {
    title,
    destination,
    backHalf = generateBackHalf(),
  } = req.body as RequestBody;

  try {
    const link = await Link.create({
      title,
      destination,
      backHalf,
      shortLink: `${config.CLIENT_ORIGIN}/${backHalf}`,
      creator: userId,
    });
    res.status(200).json({ link });
  } catch (err) {
    res.status(500).json({
      code: 'SeverError',
      message: 'Internal server error',
    });
    logger.error('Error during generating link', err);
  }
};

export default createShortLink;
