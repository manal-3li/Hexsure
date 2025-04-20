import dotenv from 'dotenv';
dotenv.config();

import express, { Application, Request, Response, NextFunction } from "express";
import userRoute from './userRoute';
import transactionRouter from './transactionRouter';
import accountRouter from './accountRouter';
import chatbotRoutes from "../Routes/chatbotRouter";
import cardRouter from "./cardRouter";
import authRoute from './authRoute';
const AllRoutes = (app: Application): void => { 
    app.use('/api/v1/users', userRoute);
    app.use('/api/v1/transactions', transactionRouter);
    app.use('/api/v1/accounts', accountRouter);
    app.use("/api/v1/chatbot", chatbotRoutes);
    app.use('/api/v1/auth', authRoute);
    app.use("/api/v1/cards", cardRouter);

    // app.all('*', (req: Request, res: Response, next: NextFunction) => {
    //   next(new ApiErrors(`The router ${req.originalUrl} is not found`, 400))
    // })
    // app.use(globalErrors);
}
  
export default AllRoutes;