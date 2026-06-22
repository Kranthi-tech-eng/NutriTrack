import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getTodayMeals,addMeal, getMeals} from "../controllers/Meal_Controller.js";

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  addMeal
);
router.get("/all",authMiddleware,getMeals);
router.get("/today", authMiddleware, getTodayMeals);


export default router;