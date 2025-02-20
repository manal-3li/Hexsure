import mongoose from "mongoose";
import UserModel from "./Models/usersModel";

const updateUsers = async () => {
    await mongoose.connect("mongodb://localhost:27017/YOUR_DATABASE_NAME");

    const result = await UserModel.updateMany(
        { accounts: { $exists: false } },
        { $set: { accounts: [] } }
    );

    console.log(`Updated ${result.modifiedCount} users.`);
    mongoose.connection.close();
};

updateUsers();
