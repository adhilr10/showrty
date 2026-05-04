import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './user';
import linkRoutes from './link';
import redirectRoutes from './redirect'

const router = Router();

router.get('/', (_req, res) => {
  res.status(200).json({ msg: 'Bismillah', status: 'ok', version: '1.0.0' });
});
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/links', linkRoutes)
router.use('/', redirectRoutes)

export default router;
