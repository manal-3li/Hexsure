"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const usersModel_1 = __importDefault(require("../Models/usersModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.createUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield usersModel_1.default.create(req.body);
    res.status(201).json({ message: "User created successfully" });
}));
exports.getUsers = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield usersModel_1.default.find();
    res.status(200).json({ data: allUsers });
}));
exports.getUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield usersModel_1.default.findById(req.params.id);
    res.status(200).json({ data: user });
}));
exports.updateUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield usersModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ data: user });
}));
exports.deleteUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield usersModel_1.default.findByIdAndDelete(req.params.id);
    res.status(200).json({ massege: "User deleted" });
}));
