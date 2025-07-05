import { Router } from "express";
import { create } from "../controllers/Student.js";

const studentRouter = new Router();

studentRouter.post("/students/register", create);

export default studentRouter;
