import mongoose, { Document } from "mongoose";

export interface Account extends Document {
    
  //IBAN
  userId: mongoose.Schema.Types.ObjectId; 
  type: "current" | "savings" | "foreign_currency"; 
  balance: number; 
  currency: string; 
  createdAt: Date; 
}
