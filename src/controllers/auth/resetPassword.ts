import { verifyPasswordResetToken } from '@/lib/jwt';
import { logger } from '@/lib/winston';
import nodemailerTransport from '@/lib/nodemailer';

import User from '@/models/user';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import type { Request, Response } from 'express';
import type { ResetLinkPayload } from '@/lib/jwt';
import type { IUser } from '@/models/user';

type RequestQuery = { token: string };
type RequestBody = Pick<IUser, 'password'>;

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.query as RequestQuery;
  const { password } = req.body as RequestBody;
  
  try {
    const {email} = verifyPasswordResetToken(token) as ResetLinkPayload
    console.log(password,email)
  } catch (err) {
     res.status(500).json({
      code: 'SeverError',
      message: 'Internal server error',
    });
    logger.error('Error during resetting password', err);
  }
};

export default resetPassword;
