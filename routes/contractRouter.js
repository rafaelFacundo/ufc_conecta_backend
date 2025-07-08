import { Router } from "express";
import { confirm, start } from "../controllers/ContractSystem.js";

const contractRouter = Router();

contractRouter.post("/contracts/request/:userId/:employerId", start);
contractRouter.post("/contracts/confirm/:opportunityId/:contractId", confirm);

export default contractRouter;
