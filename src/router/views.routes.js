// import express from "express";
// import {
//   serveIndex,
//   serveLogin,
//   serveSignUp,
//   serveAppointment,
//   serveAwards,
//   serveProfile,
// } from "../controllers/views.controller.js";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const staticPath = path.join(__dirname, "..", "..", "app");

// const router = express.Router();

// router.get("/", serveIndex);
// router.get("/login", serveLogin);
// router.get("/sign_up", serveSignUp);
// router.get("/sched_appointment", serveAppointment);
// router.get("/awards", serveAwards);
// router.get("/profile", serveProfile);

// // router.get("*", (req, res) => {
// //   res.status(404).sendFile(
// //     path.join(staticPath, "pages", "404", "index.html")
// //   );
// // });

// export default router;
