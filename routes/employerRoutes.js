import { Router } from "express";
import {
  create,
  getProfile,
  updateProfile,
  getOpportunitiesByEmployer,
} from "../controllers/Employer.js";

const employerRouter = new Router();

employerRouter.post("/employers/register", create);
employerRouter.get("/employers/:id/profile", getProfile);
employerRouter.put("/employers/:id/profile", updateProfile);

employerRouter.get("/employers/:id/opportunities", getOpportunitiesByEmployer);

export default employerRouter;

