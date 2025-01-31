import express from "express";
import {
  createAppointment,
  getAppointments,
  confirmAppointment,
  cancelAppointment,
} from "../controllers/appointment.controller.js";

const router = express.Router();

// GET
router.get("/appointments", getAppointments);

// POST
router.post("/appointments", createAppointment);

// PUT
router.put("/appointments/:id/confirm", confirmAppointment);
router.put("/appointments/:id/cancel", cancelAppointment);

export default router;
