import { Router } from "express";
import {
  getAll,
  create,
  getById,
  remove,
  getApplicants,
  applyToOpportunity,
} from "../controllers/Opportunity.js";
import {
  authenticateEmployer,
  authenticateStudent,
  authenticateStudentOrEmployer,
} from "../middlewares/auth.js";

const router = Router();

router.get("/opportunities", authenticateStudentOrEmployer, getAll);
router.post("/opportunities", authenticateEmployer, create);
router.get("/opportunities/:id", authenticateStudentOrEmployer, getById);
router.delete("/opportunities/:id", authenticateEmployer, remove);
router.get(
  "/opportunities/:id/applicants",
  authenticateEmployer,
  getApplicants
);
router.post(
  "/opportunities/:id/apply",
  authenticateStudent,
  applyToOpportunity
);

export default router;
