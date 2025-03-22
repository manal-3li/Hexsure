import { Request, Response, NextFunction } from "express";
import { getChatbotResponse } from "../Models/chatbotModel";

export const chatbotHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "Message is required and must be a string" });
    return;
  }

  try {
    const response = await getChatbotResponse(message);
    res.status(200).json({ reply: response });
  } catch (error: any) {
    console.error("Error in chatbotHandler:", error.message);
    const status = error.message.includes("rate limit") ? 429 : 
                   error.message.includes("unavailable") ? 503 : 
                   error.message.includes("server error") ? 500 : 500;
    res.status(status).json({ error: error.message });
  }
};