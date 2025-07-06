import express from "express";
import "dotenv/config";
import { connectToDataBase } from "./config/db.js";
import studentRouter from "./routes/studentRoutes.js";
import employerRouter from "./routes/employerRoutes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const API_ENTRY_POINT = "/api/v1";

app.get("/testserver", (req, res) => {
  res.send("THE SERVER IS ON FIRE 🔥.");
});

app.use(API_ENTRY_POINT, studentRouter);
app.use(API_ENTRY_POINT, employerRouter);

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log("THE SERVER IS ON THE PORT 3000");
  console.log("Going to connect to the database");
  connectToDataBase();
});
