import express from "express";
import { activateCard, toggleFreezeCard, requestNewCard, deleteCard } from "../controllers/cardController";

const router = express.Router();

router.post("/request-new", requestNewCard);
router.patch("/activate/:cardId", activateCard);
router.patch("/freeze/:cardId", toggleFreezeCard);
router.patch("/unfreeze/:cardId", toggleFreezeCard);
router.delete("/delete/:cardId", deleteCard);

export default router;
