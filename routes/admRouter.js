import { Router } from "express";
import {
  deleteOpportunity,
  deleteUser,
  getOpportunities,
  getUsers,
} from "../controllers/Administrator.js";

const admRouter = Router();

admRouter.get("/admin/users", getUsers);
admRouter.delete("/admin/users/:id", deleteUser);
admRouter.get("/admin/opportunities", getOpportunities);
admRouter.delete("/admin/opportunities/:id", deleteOpportunity);

export default admRouter;
