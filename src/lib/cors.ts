import config from '@/config';

import type { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  //Custom origin validation function
  origin(requestOrigin, callback) {
    if (requestOrigin && config.CORS_WHITELIST.includes(requestOrigin)) {
      callback(null, true);
    } else {
      callback(
        config.NODE_ENV === 'development'
          ? null
          : new Error('Not allowed by CORS'),
      );
    }
  },
};

export default corsOptions;
