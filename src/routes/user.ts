import { Router } from 'express';
// import { body } from 'express-validator';
// import bcrypt from 'bcrypt';

// import validationError from '@/middlewares/validationError';
import expressRateLimit from '@/lib/expressRateLimit';

import authentication from '@/middlewares/authentication';
import getCurrentUser from '@/controllers/user/getCurrentUser';
import authorization from '@/middlewares/authorization';
import deleteCurrentUser from '@/controllers/user/deleteCurrentUser';

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
  deleteCurrentUser
);

export default router;
