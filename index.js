import express from "express";
import "dotenv/config";
import { connectToDataBase } from "./config/db.js";
import studentRouter from "./routes/studentRoutes.js";
import employerRouter from "./routes/employerRoutes.js";
import opportunityRouter from "./routes/opportunityRoutes.js";
import admRouter from "./routes/admRouter.js";
import authRouter from "./routes/Auth.js";
import cors from "cors";
import contractRouter from "./routes/contractRouter.js";
import { authenticate } from "./middlewares/auth.js";

const app = express();

app.use(cors());
app.use(express.json());

const API_ENTRY_POINT = "/api/v1";

app.get("/testserver", (req, res) => {
  res.send("THE SERVER IS ON FIRE 🔥.");
});

app.get("/testToken", authenticate, (req, res) => {
  console.log(req.user);
  res.status(200).json({ m: "lKDLKSJdlk" });
});

app.use(API_ENTRY_POINT, studentRouter);
app.use(API_ENTRY_POINT, employerRouter);
app.use(API_ENTRY_POINT, opportunityRouter);
app.use(API_ENTRY_POINT, admRouter);
app.use(API_ENTRY_POINT, authRouter);
app.use(API_ENTRY_POINT, contractRouter);

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log("THE SERVER IS ON THE PORT 3000");
  console.log("Going to connect to the database");
  connectToDataBase();
});
