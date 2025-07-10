import { Router } from "express";
import {
  deleteOpportunity,
  deleteUser,
  getOpportunities,
  getUsers,
} from "../controllers/Administrator.js";
import { authenticateAdm } from "../middlewares/auth.js";

const admRouter = Router();

admRouter.get("/admin/users", authenticateAdm, getUsers);
admRouter.delete("/admin/users/:id", authenticateAdm, deleteUser);
admRouter.get("/admin/opportunities", authenticateAdm, getOpportunities);
admRouter.delete(
  "/admin/opportunities/:id",
  authenticateAdm,
  deleteOpportunity
);

export default admRouter;
