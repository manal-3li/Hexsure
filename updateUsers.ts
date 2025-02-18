import mongoose from "mongoose";
import UserModel from "./Models/usersModel"; 

const updateUsersAccounts = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/yourDatabaseName"); 

    await UserModel.updateMany(
      { accounts: { $exists: false } }, 
      { $set: { accounts: [] } } 
    );

    console.log("updateUsersAccounts: Done!");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error", error);
  }
};

updateUsersAccounts();
