import mongoose, { Document, Schema } from 'mongoose';
import { Property } from '@/modals/property';
import { User } from '@/modals/user';

export interface IFavorite extends Document {
  user: Schema.Types.ObjectId | User;
  property: Schema.Types.ObjectId | Property;
  createdAt: Date;
  updatedAt: Date;
}

const FavoriteSchema = new Schema<IFavorite>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    property: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
  },
  { timestamps: true }
);

// Compound index to ensure unique user-property pairs
FavoriteSchema.index({ user: 1, property: 1 }, { unique: true });

export const Favorite = mongoose.model<IFavorite>('Favorite', FavoriteSchema);