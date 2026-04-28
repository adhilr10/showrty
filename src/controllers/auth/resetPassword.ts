import { verifyPasswordResetToken } from '@/lib/jwt';
import { logger } from '@/lib/winston';
import nodemailerTransport from '@/lib/nodemailer';
import bcrypt from 'bcrypt'

import User from '@/models/user';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import type { Request, Response } from 'express';
import type { ResetLinkPayload } from '@/lib/jwt';
import type { IUser } from '@/models/user';
import { passResetInfoTemplate } from '@/mailTemplates/passwordRestInfo';


type RequestQuery = { token: string };
type RequestBody = Pick<IUser, 'password'>;

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.query as RequestQuery;
  const { password } = req.body as RequestBody;

  try {
    const { email } = verifyPasswordResetToken(token) as ResetLinkPayload;
    const user = await User.findOne({ email })
      .select('password passwordResetToken name')
      .exec();
    if (!user) return;
    if (!user.passwordResetToken) {
      res.status(404).json({
        code: 'TokenNotFound',
        message: 'This toke already use',
      });
      return
    }

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    user.password = hashPassword
    user.passwordResetToken = null
    await user.save()

    await nodemailerTransport.sendMail({
      from: 'showrty',
      to: email,
      subject: 'Password Successfully Reset',
      html: passResetInfoTemplate({
        name: user.name 
      })
    })

    res.status(204).end()
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      res.status(401).json({
        code: 'TokenExpired',
        message: 'Password reset token expired',
      });
      return
    }

    if (err instanceof JsonWebTokenError) {
      res.status(401).json({
        code: 'InvalidToken',
        message: 'Invalid password reset token',
      });
      return
    }

    res.status(500).json({
      code: 'SeverError',
      message: 'Internal server error',
    });
    logger.error('Error during resetting password', err);
  }
};

export default resetPassword;
