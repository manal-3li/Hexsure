import { body } from "express-validator";

export const chatbotValidator = [
  body("message")
    .isString()
    .withMessage("Message must be a string")
    .trim() 
    .notEmpty()
    .withMessage("Message cannot be empty")
    .isLength({ max: 500 }) 
    .withMessage("Message must not exceed 500 characters"),
];