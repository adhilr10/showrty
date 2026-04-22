import mongoose from 'mongoose';

export const generateMongooseId = () => new mongoose.Types.ObjectId();
