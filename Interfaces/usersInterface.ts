import mongoose, { Document } from 'mongoose';

type Role = 'user' | 'admin'| 'manager' ;
export interface users extends Document{
    email: string;
    password: string;
    name: string;
    username: string;  //bahy
    fingerId: number;
    role: Role;
    active: boolean;
    nationalId: string;
    cardNum: string;
    address: Address[];
    IBAN: string;
    phoneNum: string;
    cvv: string ;
    balance? :number ;
    accounts: mongoose.Schema.Types.ObjectId[];

}

export interface Address extends Document {
  street: string ;
  city: string;
  country: string;
}