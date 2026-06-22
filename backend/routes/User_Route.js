import express from "express";
import { signup,login } from "../controllers/User_Controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;