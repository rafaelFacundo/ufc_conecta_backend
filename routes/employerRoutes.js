import { Router } from "express";
import {
  create,
  getProfile,
  updateProfile,
  getOpportunitiesByEmployer,
} from "../controllers/Employer.js";
import {
  authenticateEmployer,
  authenticateStudentOrEmployer,
} from "../middlewares/auth.js";

const employerRouter = new Router();

employerRouter.post("/employers/register", create);
employerRouter.get("/employers/:id/profile", authenticateEmployer, getProfile);
employerRouter.put(
  "/employers/:id/profile",
  authenticateEmployer,
  updateProfile
);
employerRouter.get(
  "/employers/:id/opportunities",
  authenticateStudentOrEmployer,
  getOpportunitiesByEmployer
);

export default employerRouter;
