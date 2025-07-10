import { Router } from "express";
import { confirm, start } from "../controllers/ContractSystem.js";
import {
  authenticateEmployer,
  authenticateStudent,
} from "../middlewares/auth.js";

const contractRouter = Router();

contractRouter.post("/contracts/request/", authenticateEmployer, start);
contractRouter.post("/contracts/confirm/", authenticateStudent, confirm);

export default contractRouter;
