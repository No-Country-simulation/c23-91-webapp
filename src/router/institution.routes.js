import express from "express";
import {
  createInstitution,
  getInstitutions,
  deleteInstitution,
  updateInstitution,
} from "../controllers/institution.controller.js";

const router = express.Router();

router.post("/institutions", createInstitution);
router.get("/institutions", getInstitutions);
router.delete("/institutions/:id", deleteInstitution);
router.put("/institutions/:id", updateInstitution);

export default router;
