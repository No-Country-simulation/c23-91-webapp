import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./router/user.routes.js";
import donationRouter from "./router/donation.routes.js";
import appointmentRouter from "./router/appointment.routes.js";
import institutionRouter from "./router/institution.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

// Rutas
app.use("/api", userRouter);
app.use("/api", donationRouter);
app.use("/api", appointmentRouter);
app.use("/api", institutionRouter);

// MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
