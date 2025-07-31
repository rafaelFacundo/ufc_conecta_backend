import { Router } from "express";
import { login, logout, renewAccessToken } from "../controllers/Auth.js";
import {
  sendEmailVerification,
  verifyEmailCode,
} from "../controllers/emailVerification.js";
import {
  authenticateRefreshToken,
  authenticateStudentOrEmployer,
} from "../middlewares/auth.js";

const authRouter = Router();

authRouter.post("/auth/login", login);
authRouter.post("/auth/send-email", sendEmailVerification);
authRouter.post("/auth/verify-email-code", verifyEmailCode);
authRouter.post("/auth/refresh", authenticateRefreshToken, renewAccessToken);
authRouter.post("/auth/logout", logout);

export default authRouter;
