import express from "express";
import {
  createAppointment,
  getAppointments,
  confirmAppointment,
} from "../controllers/appointment.controller.js";

const router = express.Router();

// GET
router.get("/appointments", getAppointments);

// POST
router.post("/appointments", createAppointment);

// PUT
router.put("/appointments/:appointmentId/confirm", confirmAppointment);

export default router;
