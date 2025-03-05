import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import logger from "./src/config/logger.js";

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
