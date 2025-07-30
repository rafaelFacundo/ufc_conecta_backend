import { Router } from "express";
import { confirm, refuse, start } from "../controllers/ContractSystem.js";
import {
  authenticateEmployer,
  authenticateStudent,
} from "../middlewares/auth.js";

const contractRouter = Router();

contractRouter.post("/contracts/request/", authenticateEmployer, start);
contractRouter.post("/contracts/confirm/", authenticateStudent, confirm);
contractRouter.post("/contracts/refuse/", authenticateEmployer, refuse);

export default contractRouter;
