import mongoose, { Document, Types } from "mongoose";

type Role = "user" | "admin" | "manager";
type AccountType = "current" | "savings" | "foreign_currency";

export interface users extends Document {
  email: string;
  PIN: string;
  name: string;
  // username: string;
  fingerId: number;
  role: Role;
  active: boolean;
  nationalId: string;
  // cardNum: string;
  address: Address[];
  // IBAN: string;
  phoneNum: string;
  // cvv: string ;
  balance?: number;
  birthDate: Date;
  accounts?: Account[];
  cardId?: mongoose.Types.ObjectId;
}

export interface Address extends Document {
  street: string;
  city: string;
  country: string;
}

export interface Account {
  _id: Types.ObjectId;
  type: AccountType;
}
