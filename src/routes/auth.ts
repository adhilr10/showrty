import { Router } from 'express';
import { body } from 'express-validator';
import bcrypt from 'bcrypt';

import register from '@/controllers/auth/register';
import validationError from '@/middlewares/validationError';
import expressRateLimit from '@/lib/expressRateLimit';
import User from '@/models/user';
import login from '@/controllers/auth/login';
import logout from '@/controllers/auth/logout';
import authentication from '@/middlewares/authentication';
import refreshToken from '@/controllers/auth/refreshToken';
import forgetPassword from '@/controllers/auth/forgetPassword';
import resetPassword from '@/controllers/auth/resetPassword';

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
      const userExists = await User.exists({ email: value }).exec();
      if (userExists) {
        throw new Error('This email already in use');
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

router.post(
  '/login',
  expressRateLimit('auth'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (email) => {
      const user = await User.exists({ email }).exec();
      if (!user) {
        throw new Error('No user found with this email');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({
      min: 8,
    })
    .withMessage('Password must be at least 8 characters long')
    .custom(async (password, { req }) => {
      const { email } = req.body;
      const user = await User.findOne({ email })
        .select('password')
        .lean()
        .exec();
      if (!user) return;
      const passwordIsValid = await bcrypt.compare(password, user.password);

      if (!passwordIsValid) {
        throw new Error('Incorrect password');
      }
    }),
  validationError,
  login,
);

router.delete('/logout', expressRateLimit('basic'), authentication, logout);

router.get('/refreshToken', expressRateLimit('basic'), refreshToken);

router.post(
  '/forget-password',
  expressRateLimit('basic'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid Email address')
    .custom(async (email) => {
      const userExists = User.exists({ email }).exec();

      if (!userExists) {
        throw new Error('No user found with this email');
      }
    }),
  validationError,
  forgetPassword,
);

router.post(
  '/reset-password',
  expressRateLimit('passReset'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 character long'),
    validationError,
    resetPassword

);

export default router;
