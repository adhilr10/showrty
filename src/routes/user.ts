import { Router } from 'express';
import bcrypt from 'bcrypt';
import { body } from 'express-validator';

import expressRateLimit from '@/lib/expressRateLimit';
import authentication from '@/middlewares/authentication';
import getCurrentUser from '@/controllers/user/getCurrentUser';
import authorization from '@/middlewares/authorization';
import deleteCurrentUser from '@/controllers/user/deleteCurrentUser';
import validationError from '@/middlewares/validationError';
import updateCurrentUser from '@/controllers/user/updateCurrentUser';
import User from '@/models/user';

const router = Router();

router.get(
  '/current',
  expressRateLimit('basic'),
  authentication,
  authorization(['user', 'admin']),
  getCurrentUser,
);

router.delete(
  '/current',
  expressRateLimit('basic'),
  authentication,
  authorization(['user', 'admin']),
  deleteCurrentUser,
);

router.patch(
  '/current',
  expressRateLimit('basic'),
  authentication,
  authorization(['user', 'admin']),
  body('name').optional(),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (email) => {
      const isDuplicate = await User.findOne({ email }).exec();
      if (isDuplicate) {
        throw new Error('This email already in use');
      }
    }),
  body('current_password')
    .optional()
    .custom(async (currentPassword, { req }) => {
      const userId = req.userId;
      const user = await User.findById(userId).select('password').lean().exec();
      if (!user) return;
      const passwordIsValid = await bcrypt.compare(
        currentPassword,
        user.password,
      );
      if (!passwordIsValid) {
        throw new Error('Current password is wrong');
      }
    }),
  body('new_password')
    .optional()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 character long'),
  body('role').optional().custom(() => {
    throw new Error(`You don't have permission to change the role`)
  }),
  validationError,
  updateCurrentUser,
);

export default router;
