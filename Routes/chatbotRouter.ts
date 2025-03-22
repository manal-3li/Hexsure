import express from "express";
import { chatbotHandler } from "../controllers/chatbotController";
import { chatbotValidator } from "../validators/chatbotValidator";

const router = express.Router();

router.post("/", chatbotValidator, chatbotHandler);

export default router;