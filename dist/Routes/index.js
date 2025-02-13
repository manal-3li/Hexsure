"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoute_1 = __importDefault(require("./userRoute"));
const AllRoutes = (app) => {
    app.use('/api/v1/users', userRoute_1.default);
    // app.all('*', (req: Request, res: Response, next: NextFunction) => {
    //   next(new ApiErrors(`The router ${req.originalUrl} is not found`, 400))
    // })
    // app.use(globalErrors);
};
exports.default = AllRoutes;
