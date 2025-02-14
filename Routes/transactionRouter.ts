import express from 'express';
<<<<<<< HEAD
import { depositMoney, transferMoney } from '../controllers/transactionController';
=======
import { depositMoney, transferMoney, getTransactionHistory } from '../controllers/transactionController';
>>>>>>> d4a8e6a (Initial commit)
import { transactionValidationRules } from '../validators/transactionValidator';
import asyncHandler from 'express-async-handler';

const transactionRouter = express.Router();

transactionRouter.post('/deposit', transactionValidationRules, asyncHandler(depositMoney));
transactionRouter.post('/transfer', transactionValidationRules, asyncHandler(transferMoney));
<<<<<<< HEAD
=======
transactionRouter.get('/history/:userId', transactionValidationRules, asyncHandler(getTransactionHistory));
>>>>>>> d4a8e6a (Initial commit)

export default transactionRouter;