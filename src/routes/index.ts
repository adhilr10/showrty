import { Router } from 'express';
import authRoute from './auth';
import userRoute from './user';

const router = Router();

router.get('/', (_req, res) => {
  res.status(200).json({ msg: 'Bismillah', status: 'ok', version: '1.0.0' });
});
router.use('/auth', authRoute);
router.use('/users', userRoute);

export default router;
