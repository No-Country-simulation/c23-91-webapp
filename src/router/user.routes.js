import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserDetailsById,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.get("/profile/:id", getUserDetailsById);

router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
