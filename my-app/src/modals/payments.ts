import mongoose, { Document, Schema } from 'mongoose';
import { Property } from '@/modals/property';
import { User } from '@/modals/user';

export interface IPayment extends Document {
  user: Schema.Types.ObjectId | User;
  property: Schema.Types.ObjectId | Property;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId: string;
  receiptUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    property: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: { type: String, required: true },
    transactionId: { type: String, required: true },
    receiptUrl: { type: String },
  },
  { timestamps: true }
);

export const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);