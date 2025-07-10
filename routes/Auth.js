import { Router } from "express";
import { login } from "../controllers/Auth.js";

const authRouter = Router();

authRouter.post("/auth/login", login);
authRouter.post("/auth/send-email", sendEmailVerification);
authRouter.post("/auth/verify-email-code", verifyEmailCode);

export default authRouter;
