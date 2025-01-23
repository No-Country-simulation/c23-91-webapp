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

// GET
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.get("/users/:id/details", getUserDetailsById);

// POST 
router.post("/users", createUser);

// UPDATE 
router.put("/users/:id", updateUser);

// DELETE 
router.delete("/users/:id", deleteUser);

export default router;
