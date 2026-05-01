import mongoose from 'mongoose';

export const generateMongooseId = () => new mongoose.Types.ObjectId();

export const generateBackHalf = (length: number = 5): string => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let backHalf = ''

  for (let i=0; i< length; i++) {
    backHalf += chars[Math.floor(Math.random() * chars.length)]
  }
  return backHalf
};
