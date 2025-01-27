import express from "express";
import {
  login,
  registerUser,
  registerUsersBatch,
} from "../controllers/auth.controller.js";

const router = express.Router();

// POST
router.post("/login", login);
router.post("/register", registerUser);
router.post("/register/batch", registerUsersBatch);

export default router;
