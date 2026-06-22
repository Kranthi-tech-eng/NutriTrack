import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

import {
  saveProfile,
  getProfile
} from "../controllers/Profile_Controller.js";



const router = express.Router();

router.post(
  "/save",
  authMiddleware,
  saveProfile
);

router.get(
  "/get",
  authMiddleware,
  getProfile
);

export default router;