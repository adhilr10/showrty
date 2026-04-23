import { verifyAccessToken } from '@/lib/jwt';
import type { NextFunction, Request, Response } from 'express';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { TokenPayload } from '@/lib/jwt';

import { logger } from '@/lib/winston';


const authentication = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  //Retrieve authorization from request header
  const { authorization } = req.headers;

  //Handle case when client doesn't send request with authorization header
  if (!authorization) {
    res.status(401).json({
      code: 'AccessTokenError',
      message: 'Access token is required',
    });
    return;
  }

  // Retrieve only token from authorization
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, accessToken] = authorization.split(' ');
  try {
    // Get the userId from payload
    const { userId } = verifyAccessToken(accessToken) as TokenPayload;

    // send the userId to next controller function
    req.userId = userId;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({
        code: 'AccessTokenExpired',
        message: 'Access token  expired',
      });
      return;
    }
    // Handle when access token is invalid
    if (error instanceof JsonWebTokenError) {
      res.status(401).json({
        code: 'AccessTokenError',
        message: 'Access token is invalid',
      });
      return;
    }
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
    });
    logger.error('Error while authentication a user', error);
  }
};
export default authentication;
