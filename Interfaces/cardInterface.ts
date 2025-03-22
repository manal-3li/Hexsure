import mongoose, { Schema, Document } from "mongoose";

export interface ICard {
    userId: mongoose.Types.ObjectId;
    cardNumber: string;
    expiryDate: string;
    isActive: boolean;
    isFrozen: boolean;
  }
  