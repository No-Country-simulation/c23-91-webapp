import mongoose from "mongoose";
import config from "../config/config.js";
import logger from "../config/logger.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
