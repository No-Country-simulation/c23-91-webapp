import express from "express";
import {
  createAppointment,
  getAppointments,
} from "../controllers/appointment.controller.js";

const router = express.Router();

// GET
router.get("/appointments", getAppointments);

// POST
router.post("/appointments", createAppointment);

export default router;
