import mongoose, { Document } from "mongoose";

export interface Account extends Document {
    
  userId: mongoose.Schema.Types.ObjectId; 
  type: "current" | "savings" | "foreign_currency"; 
  balance: number; 
  currency: string; 
  cardNum: string;
  IBAN: string;
  createdAt: Date; 
}
