import { Router } from "express";
import {
  getAll,
  create,
  getById,
  remove,
  getApplicants,
  applyToOpportunity,
} from "../controllers/Opportunity.js";

const router = Router();

router.get("/opportunities", getAll);
router.post("/opportunities", create);
router.get("/opportunities/:id", getById);
router.delete("/opportunities/:id", remove);
router.get("/opportunities/:id/applicants", getApplicants);
router.post("/opportunities/:id/apply", applyToOpportunity);

export default router;

