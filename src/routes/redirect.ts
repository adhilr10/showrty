import { Router } from 'express';

import expressRateLimit from '@/lib/expressRateLimit';
import redirect from '@/controllers/redirect/redirect';

const router = Router();

router.get('/:backHalf', expressRateLimit('basic'), redirect);

export default router;
