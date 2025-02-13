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
exports.userValidationRules = void 0;
const express_validator_1 = require("express-validator");
const usersModel_1 = __importDefault(require("../Models/usersModel"));
exports.userValidationRules = [
    // Name validation
    (0, express_validator_1.body)("name")
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
    // Email validation
    (0, express_validator_1.body)("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format")
        .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield usersModel_1.default.findOne({ email });
        if (existingUser) {
            throw new Error("Email already exists");
        }
    })),
    // Password validation
    (0, express_validator_1.body)("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6, max: 6 }).withMessage("Password must be 6 characters"),
    // Phone number validation
    (0, express_validator_1.body)("phoneNum")
        .notEmpty().withMessage("Phone number is required")
        .isString().withMessage("Phone number must be string")
        .isLength({ min: 11, max: 11 }).withMessage("Phone number must be 11 digits"),
    // IBAN validation
    (0, express_validator_1.body)("IBAN")
        .notEmpty().withMessage("IBAN is required")
        .isString().withMessage("IBAN must be a string"),
    // Card number validation
    (0, express_validator_1.body)("cardNum")
        .notEmpty().withMessage("Card number is required")
        .isString().withMessage("Card number must be string")
        .isLength({ min: 15, max: 15 }).withMessage("Card number must be 15 digits"),
    // CVV validation
    (0, express_validator_1.body)("cvv")
        .notEmpty().withMessage("CVV is required")
        .isNumeric().withMessage("CVV must be numeric")
        .isLength({ min: 3, max: 3 }).withMessage("CVV must be 3 digits"),
    // National ID validation
    (0, express_validator_1.body)("nationalId")
        .notEmpty().withMessage("National ID is required")
        .isString().withMessage("National ID must be string")
        .isLength({ min: 15, max: 15 }).withMessage("National ID must be 15 digits"),
    // Fingerprint ID validation
    (0, express_validator_1.body)("fingerId")
        .notEmpty().withMessage("Fingerprint ID is required")
        .isNumeric().withMessage("Fingerprint ID must be numeric"),
    // Address validation
    (0, express_validator_1.body)("address")
        .isArray({ min: 1 }).withMessage("At least one address is required"),
    (0, express_validator_1.body)("address.*.street")
        .notEmpty().withMessage("Street is required"),
    (0, express_validator_1.body)("address.*.city")
        .notEmpty().withMessage("City is required"),
    (0, express_validator_1.body)("address.*.country")
        .notEmpty().withMessage("Country is required")
];
