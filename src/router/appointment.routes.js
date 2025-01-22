import express from "express";
import authMiddleware from "../middlewares/authmiddleware.js";
import {
  createAppointment,
  getAppointments,
} from "../controllers/appointment.controller.js";

const router = express.Router();

router.post("/appointments", authMiddleware, createAppointment);
router.get("/appointments", getAppointments);

export default router;
 