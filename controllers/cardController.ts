import { Request, Response, NextFunction } from "express";
import Card from "../Models/cardModel";
import User from "../Models/usersModel";  


export const requestNewCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return next();
    }

    const existingCard = await Card.findOne({ userId });
    if (existingCard) {
      res.status(400).json({ message: "User already has a card" });
      return;
    }

    const newCard = new Card({
      userId,
      cardNumber: `CARD-${Math.floor(1000000000 + Math.random() * 9000000000)}`, 
      expiryDate: "12/30",
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
    const card = await Card.findByIdAndUpdate(cardId, { isActive: true }, { new: true });

    if (!card) {
      res.status(404).json({ message: "Card not found" });
      return next();
    }

    res.json({ message: "Card activated successfully", card });
  } catch (error) {
    next(error);
  }
};

export const toggleFreezeCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { cardId } = req.params;
      const card = await Card.findById(cardId);
  
      if (!card) {
        res.status(404).json({ message: "Card not found" });
        return next();
      }
  
      if (card.isFrozen) {
        card.isFrozen = false;
        await card.save();
        res.json({ message: "Card has been unfrozen successfully", card });
      } else {
        card.isFrozen = true;
        await card.save();
        res.json({ message: "Card has been frozen successfully", card });
      }
    } catch (error) {
      next(error);
    }
  };
