import { Router } from "express";
import { create } from "../controllers/Employer.js";

const employerRouter = new Router();

employerRouter.post("/employers/register", create);

export default employerRouter;
