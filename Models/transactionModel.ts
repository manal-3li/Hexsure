import { Schema, model } from 'mongoose';
import { transactions } from '../Interfaces/transactionInterface';
 
const transactionSchema: Schema = new Schema<transactions>({
  accountId: { type: Schema.Types.ObjectId, ref: "Account", required: true }, 
  userId: { type:  Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["deposit", "withdraw", "transfer"], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  sender: { type:  Schema.Types.ObjectId, ref: "User" },
  recipient: { type:  Schema.Types.ObjectId, ref: "User" },
  direction: { type: String, enum: ["sent", "received"]}, 
}, { timestamps: true });

const transactionModel = model<transactions>('Transaction', transactionSchema);
export default transactionModel;