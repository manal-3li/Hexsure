import mongoose, { Schema, Document } from "mongoose";
import { ICard } from "../Interfaces/cardInterface";

interface ICardModel extends ICard, Document {} 

const CardSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  cardNumber: { type: String, required: true, unique: true },
  expiryDate: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  isFrozen: { type: Boolean, default: false },
});

export default mongoose.model<ICardModel>("Card", CardSchema);
