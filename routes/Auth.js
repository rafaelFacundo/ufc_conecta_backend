import { Router } from "express";
import { login } from "../controllers/Auth.js";

const authRouter = Router();

authRouter.post("/auth/login", login);

export default authRouter;
