import mongoose, { Document } from 'mongoose';

export interface transactions extends Document {
  accountId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  type: "deposit" | "withdraw" | "transfer";
  amount: number;
  date: Date;
  sender?: mongoose.Types.ObjectId;
  recipient?: mongoose.Types.ObjectId;
  direction?: "sent" | "received"; // NEW FIELD
}