import User from '@/models/user';
import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { logger } from '@/lib/winston';

const updateCurrentUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.userId;
  const requestToBody = req.body;

  if (requestToBody.newPassword) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(requestToBody.new_password, salt);
    requestToBody.new_password = hashPassword;
  }
  try {
    await User.updateOne({ _id: userId }, requestToBody);
    res.sendStatus(204)
  } catch (err) {
    res.status(500).json({
      code: 'SeverError',
      message: 'Internal server error',
    });
    logger.error('Error during updating user data', err);
  }
};

export default updateCurrentUser;
