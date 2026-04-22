import { Router } from 'express';
import { body } from 'express-validator';
// import bcrypt from 'bcrypt';

import register from '@/controllers/auth/register';
import validationError from '@/middlewares/validationError';
import expressRateLimit from '@/lib/expressRateLimit';
import User from '@/models/user';

const router = Router();

router.post(
  '/register',
  expressRateLimit('basic'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (value) => {
      const userExists = await User.exists({email: value}).exec()
      if (userExists) {
        throw new Error("This email already in use")
      }
    }),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 character long'),
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['user', 'admin'])
    .withMessage('Role is not support'),
  validationError,
  register,
);

export default router;
