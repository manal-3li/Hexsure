import express from "express";
import { createAccount, getUserAccounts } from "../controllers/accountController";

const accountRouter = express.Router();

accountRouter.post("/create/:userId", createAccount);
accountRouter.get("/user/:userId", getUserAccounts);

export default accountRouter;