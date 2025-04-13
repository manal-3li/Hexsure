import mongoose, { Schema, Document } from "mongoose";

export interface ICard {
  userId: mongoose.Types.ObjectId;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  isActive: boolean;
  isFrozen: boolean;
  cardHolderName: string; 
  cardPassword: string;
}