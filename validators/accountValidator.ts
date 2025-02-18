import { check } from "express-validator";
import usersModel from "../Models/usersModel";
import accountModel from "../Models/accountModel";


export const accountValidationRules = [

  check("userId")
    .isMongoId().withMessage("Invalid userId format")
    .custom(async (userId) => {
      const userExists = await usersModel.findById(userId);
      if (!userExists) {
        throw new Error("User does not exist");
      }
    }),

  check("accountType")
    .isIn(["current", "savings"]).withMessage("Invalid account type"),

  check("balance")
    .optional()
    .isFloat({ min: 0 }).withMessage("Balance must be a positive number"),

  check("accountType").custom(async (accountType, { req }) => {
    const existingAccount = await accountModel.findOne({
      userId: req.body.userId,
      accountType,
    });

    if (existingAccount) {
      throw new Error(`User already has a ${accountType} account`);
    }
  }),
];
