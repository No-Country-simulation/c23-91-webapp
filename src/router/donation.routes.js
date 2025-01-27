import express from "express";
import {
  createDonation,
  getDonations,
} from "../controllers/donation.controller.js";

const router = express.Router();

// GET
router.get("/donations", getDonations);

// POST
router.post("/donations", createDonation);

export default router;
