import { Request, Response, NextFunction } from "express";
import Card from "../Models/cardModel";
import User from "../Models/usersModel";

const generateCardNumber = () => {
  return Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join('');
};

const generateCVV = () => {
  return Math.floor(100 + Math.random() * 900).toString();
};

const generateExpiryDate = () => {
  const expiry = new Date();
  expiry.setFullYear(expiry.getFullYear() + 4);
  const month = (expiry.getMonth() + 1).toString().padStart(2, "0");
  const year = expiry.getFullYear().toString().slice(-2);
  return `${month}/${year}`;
};

export const requestNewCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    
    const { userId, password, confirmPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (!password || !confirmPassword) {
      res.status(400).json({ message: "Password and confirmation are required" });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({ message: "Passwords do not match" });
      return;
    }

    const existingCard = await Card.findOne({ userId });
    if (existingCard) {
      res.status(400).json({ message: "User already has a card" });
      return;
    }

    const newCard = new Card({
      userId,
      cardHolderName: user.name,
      cvv: generateCVV(),
      cardNumber: generateCardNumber(),
      expiryDate: generateExpiryDate(),
      cardPassword: password,
      isActive: false,
      isFrozen: false,
    });

    await newCard.save();
    res.status(201).json({ message: "New card requested successfully", card: newCard });
  } catch (error) {
    next(error);
  }
};

export const activateCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { cardId } = req.params;
    const { password } = req.body;

    const card = await Card.findById(cardId);

    if (!card) {
      res.status(404).json({ message: "Card not found" });
      return;
    }

    if (card.cardPassword !== password) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    card.isActive = true;
    await card.save();

    res.json({ message: "Card activated successfully", card });

  } catch (error) {
    next(error);
  }
};


export const toggleFreezeCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { cardId } = req.params;
    const { password } = req.body;

    const card = await Card.findById(cardId);

    if (!card) {
      res.status(404).json({ message: "Card not found" });
      return;
    }

    if (card.cardPassword !== password) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    card.isFrozen = !card.isFrozen;
    await card.save();

    res.json({
      message: card.isFrozen ? "Card has been frozen" : "Card has been unfrozen",
      card
    });

  } catch (error) {
    next(error);
  }
};


export const deleteCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { cardId } = req.params;
    const { password } = req.body;

    const card = await Card.findById(cardId);

    if (!card) {
      res.status(404).json({ message: "Card not found" });
      return;
    }

    if (card.cardPassword !== password) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    await Card.findByIdAndDelete(cardId);
    res.json({ message: "Card deleted successfully" });

  } catch (error) {
    next(error);
  }
};
