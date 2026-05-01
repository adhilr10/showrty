import { Schema, model, Types } from 'mongoose';

export interface ILink {
  title: string;
  destination: string;
  backHalf: string;
  shortLink: string;
  creator: Types.ObjectId;
  totalVisitCount: number;
}

const linkSchema = new Schema<ILink>(
  {
    title: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    backHalf: {
      type: String,
      required: true,
      unique: true,
    },
    shortLink: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    totalVisitCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Link = model<ILink>('Link', linkSchema);

export default Link;
