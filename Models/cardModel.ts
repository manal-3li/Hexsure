import mongoose, { Schema, Document } from "mongoose";
import { ICard } from "../Interfaces/cardInterface";

interface ICardModel extends ICard, Document {} 

const CardSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: "Card", required: false },
  cardNumber: { type: String, required: true, unique: true },
  expiryDate: { type: String, required: true },
  cvv: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  isFrozen: { type: Boolean, default: false },
  cardHolderName: { type: String, required: true },
  cardPassword: { type: String, required: true }
});

export default mongoose.model<ICardModel>("Card", CardSchema);
