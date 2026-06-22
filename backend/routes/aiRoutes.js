import express from "express";
import { getNutritionFromText,getNutritionFromImage,testGroqModels} from "../controllers/AI_Controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post(
  "/nutrition/text",
  authMiddleware,
  getNutritionFromText
);
router.post(
  "/nutrition/image",
  upload.single("image"),
  getNutritionFromImage
);
router.get("/models", testGroqModels);
export default router;