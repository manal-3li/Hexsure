// import * as all from '../Interfaces';
import { Application, Request, Response, NextFunction } from "express";
import userRoute from './userRoute'


const AllRoutes = (app: Application): void => {
    
    app.use('/api/v1/users', userRoute);
    
    // app.all('*', (req: Request, res: Response, next: NextFunction) => {
    //   next(new ApiErrors(`The router ${req.originalUrl} is not found`, 400))
    // })
    // app.use(globalErrors);
  }
  
  export default AllRoutes;
