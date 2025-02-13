"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const usersValidator_1 = require("../validators/usersValidator");
const userRouter = express_1.default.Router();
userRouter.route('/')
    .post(usersValidator_1.userValidationRules, usersController_1.createUser)
    .get(usersController_1.getUsers);
userRouter.route('/:id')
    .get(usersController_1.getUser)
    .put(usersController_1.updateUser)
    .delete(usersController_1.deleteUser);
exports.default = userRouter;
