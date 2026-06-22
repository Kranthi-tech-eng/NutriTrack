import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getDashboard } from "../controllers/Dashboard_Controller.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getDashboard
);

export default router;