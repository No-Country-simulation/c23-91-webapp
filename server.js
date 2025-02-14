import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import config from "./src/config/config.js";
import logger from "./src/config/logger.js";

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
