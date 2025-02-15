import app from "./app.js";
import connectDB from "./config/db.js";
import config from "./config/config.js";
import logger from "./config/logger.js";

const startServer = async () => {
  try {
    await connectDB();
    const PORT = config.PORT || 8080;
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
