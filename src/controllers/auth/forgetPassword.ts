import { logger } from '@/lib/winston';


import User from '@/models/user';
import type { IUser } from '@/models/user';
import type { Request, Response } from 'express';
import { generatePasswordResetToken } from '@/lib/jwt';
import nodemailerTransport from '@/lib/nodemailer';
import { resetLinkTemplate } from '@/mailTemplates/resetLink';

type RequestBody = Pick<IUser, 'email'>;

const forgetPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body as RequestBody;
  try {
    const passwordResetToken = generatePasswordResetToken({ email });
    const user = await User.findOne({ email })
      .select('name passwordResetToken')
      .exec();
    if (!user) return;

    await nodemailerTransport.sendMail({
      from: '"Showrty',
      to: email,
      subject: 'Password Reset Request',
      html: resetLinkTemplate(passwordResetToken),
    });

    user.passwordResetToken = passwordResetToken;
    await user.save();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({
      code: 'SeverError',
      message: 'Internal server error',
    });
    logger.error('Error during sending reset link to email', err);
  }
};

export default forgetPassword;
