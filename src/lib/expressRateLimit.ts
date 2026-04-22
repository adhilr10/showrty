import { rateLimit } from 'express-rate-limit';

import config from '@/config';

import type { RateLimitRequestHandler, Options } from 'express-rate-limit';
type RateLimitType = 'basic' | 'auth' | 'passReset';

const defaultLimitOpt: Partial<Options> = {
  windowMs: config.WINDOW_MS,
  legacyHeaders: false,
  standardHeaders: false,
};

//Map holding specific rate limit options based type
const rateLimitOpt = new Map<RateLimitType, Partial<Options>>([
  ['basic', { ...defaultLimitOpt, limit: 100 }], //100 req per window
  ['auth', { ...defaultLimitOpt, limit: 10 }], //10 req per window
  ['passReset', { ...defaultLimitOpt, limit: 3 }], //3 req per window
]);

// function to get rate limit middleware based on type
const expressRateLimit = (type: RateLimitType): RateLimitRequestHandler => {
  return rateLimit(rateLimitOpt.get(type));
};

export default expressRateLimit;
