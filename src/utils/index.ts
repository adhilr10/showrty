import config from '@/config';
import mongoose from 'mongoose';
import type { GenLinkProps } from '@/types';
type GenPrevLinkProps = Omit<GenLinkProps, 'total'>;

export const generateMongooseId = () => new mongoose.Types.ObjectId();

export const generateBackHalf = (length: number = 5): string => {
  const chars =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let backHalf = '';

  for (let i = 0; i < length; i++) {
    backHalf += chars[Math.floor(Math.random() * chars.length)];
  }
  return backHalf;
};

export const generateNextLink = ({
  baseUrl,
  search,
  sortby,
  offset,
  limit,
  total,
}: GenLinkProps): string | null => {
  if (total <= limit + offset) return null;
  const origin =
    config.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : config.CLIENT_ORIGIN;
  const url = new URL(`${origin}${baseUrl}/my-links`);
  const params = new URLSearchParams();

  if (search) params.set('search', search);
  if (sortby) params.set('sortby', sortby);
  params.set('offset', String(offset + limit));
  params.set('limit', String(limit));

  url.search = params.toString();

  return url.toString();
};

export const generatePrevLink = ({
  baseUrl,
  search,
  sortby,
  offset,
  limit,
}: GenPrevLinkProps): string | null => {
  if (offset <= 0) return null;

  const origin =
    config.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : config.CLIENT_ORIGIN;
  const url = new URL(`${origin}${baseUrl}/my-links`);
  const params = new URLSearchParams();

  if (search) params.set('search', search);
  if (sortby) params.set('sortby', sortby);
  params.set('offset', String(offset - limit <= 0 ? 0 : offset - limit));
  params.set('limit', String(limit));

  url.search = params.toString();
  
  return url.toString();
};
