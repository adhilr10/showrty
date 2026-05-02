import { Router } from 'express';
import { body, query, param } from 'express-validator';

import expressRateLimit from '@/lib/expressRateLimit';
import authentication from '@/middlewares/authentication';
import authorization from '@/middlewares/authorization';
import validationError from '@/middlewares/validationError';
import createShortLink from '@/controllers/link/createShortLink';
import Link from '@/models/link';
import getMyLinks from '@/controllers/link/getMyLinks';

const router = Router();

router.post(
  '/generate',
  expressRateLimit('basic'),
  authentication,
  authorization(['user', 'admin']),
  body('title').notEmpty().withMessage('Title is required'),
  body('destination')
    .notEmpty()
    .withMessage('Destination is required')
    .isURL()
    .withMessage('Invalid url'),
  body('backHalf')
    .optional()
    .trim()
    .custom(async (backHalf) => {
      const backHalfExist = await Link.exists({ backHalf }).exec();
      if (backHalfExist) {
        throw new Error('This backHalf is already in use');
      }
    }),
  validationError,
  createShortLink,
);

router.get(
  '/my-links',
  expressRateLimit('basic'),
  authentication,
  authorization(['user', 'admin']),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 to 100'),
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Offset must be positive number'),
    validationError,
    getMyLinks
);
export default router;
