// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const staticPath = path.join(__dirname, "..", "..", "app");

// const serveView = (viewName) => (req, res) => {
//   const filePath = path.join(staticPath, "pages", viewName, "index.html");
//   res.sendFile(filePath, (err) => {
//     if (err) {
//       console.error(`Error sending ${viewName}.html:`, err);
//       res.status(500).send("Error loading page");
//     }
//   });
// };

// export const serveIndex = (req, res) => {
//   res.sendFile(path.join(staticPath, "index.html"));
// };

// export const serveLogin = serveView("login");
// export const serveSignUp = serveView("sign_up");
// export const serveAppointment = serveView("sched_appointment");
// export const serveAwards = serveView("awards");
// export const serveProfile = serveView("profile");
