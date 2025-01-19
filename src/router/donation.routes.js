import express from "express";
import {
  createDonation,
  getDonations,
} from "../controllers/donation.controller.js";

const router = express.Router();

router.post("/donations", createDonation);
router.get("/donations", getDonations);

export default router;
