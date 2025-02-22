import express from "express";
import cors from "cors";
import helmet from "helmet";
import httpLogger from "./middlewares/httpLogger.js";

import userRouter from "./router/user.routes.js";
import donationRouter from "./router/donation.routes.js";
import appointmentRouter from "./router/appointment.routes.js";
import institutionRouter from "./router/institution.routes.js";
import authRouter from "./router/auth.routes.js";
// import viewsRouter from "./router/views.routes.js"

// import { fileURLToPath } from "url";
// import path from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Express
const app = express();

// Middlewares
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:5500",
      "http://localhost:8080",
      "https://c23-91-webapp-nfvs.onrender.com"
    ],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(httpLogger);

// // Servir archivos estáticos (CSS, JS, imágenes)
// const staticPath = path.join(__dirname, "..", "app");
// app.use(express.static(staticPath));

// Rutas
app.use("/api", userRouter);
app.use("/api", donationRouter);
app.use("/api", appointmentRouter);
app.use("/api", institutionRouter);
app.use("/auth", authRouter);
// app.use("/", viewsRouter)

export default app;
