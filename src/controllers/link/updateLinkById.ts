import { logger } from '@/lib/winston';

import Link from '@/models/link';

import type { Request, Response } from 'express';
import type { ILink } from '@/models/link';
type requestBody = Pick<ILink, 'title' | 'destination' | 'backHalf'>;

const updateLinkById = async (req: Request, res: Response): Promise<void> => {
  const { linkId } = req.params;
  const userId = req.userId;
  const requestToUpdate = req.body as requestBody;

  try {
    const isLinkAvailable = await Link.exists({ _id: linkId }).exec();
    if (!isLinkAvailable) {
      res.status(404).json({
        code: 'NotFound',
        message: 'This link is not available',
      });
      return;
    }
    const isLinkCreator = await Link.exists({
      _id: linkId,
      creator: userId,
    }).exec();
    if (!isLinkCreator) {
      res.status(403).json({
        code: 'AccessDenied',
        message: "You don't have permission to modify this link",
      });
      return;
    }
    await Link.updateOne({ _id: linkId }, requestToUpdate);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({
      code: 'SeverError',
      message: 'Internal server error',
    });
    logger.error('Error during updating link', err);
  }
};

export default updateLinkById;
