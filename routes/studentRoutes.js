import { Router } from "express";
import {
  addArticle,
  addCertificate,
  addExperience,
  addProject,
  create,
  deleteArticle,
  deleteCertificate,
  deleteExperience,
  deleteProject,
  getArticle,
  getCertificate,
  getExperiences,
  getProfile,
  getProject,
  updateArticle,
  updateCertificate,
  updateExperience,
  updateProfile,
  updateProject,
} from "../controllers/Student.js";

const studentRouter = new Router();

studentRouter.post("/students/register", create);
studentRouter.get("/students/:id/profile", getProfile);
studentRouter.put("/students/:id/profile", updateProfile);

studentRouter.get("/students/:id/experiences", getExperiences);
studentRouter.put("/students/:id/experiences/:expId", updateExperience);
studentRouter.post("/students/:id/experiences", addExperience);
studentRouter.delete("/students/:id/experiences/:expId", deleteExperience);

studentRouter.get("/students/:id/projects", getProject);
studentRouter.put("/students/:id/projects/:projId", updateProject);
studentRouter.post("/students/:id/projects", addProject);
studentRouter.delete("/students/:id/projects/:projId", deleteProject);

studentRouter.get("/students/:id/articles", getArticle);
studentRouter.put("/students/:id/articles/:artcId", updateArticle);
studentRouter.post("/students/:id/articles", addArticle);
studentRouter.delete("/students/:id/articles/:artcId", deleteArticle);

studentRouter.get("/students/:id/certificates", getCertificate);
studentRouter.put("/students/:id/certificates/:certId", updateCertificate);
studentRouter.post("/students/:id/certificates", addCertificate);
studentRouter.delete("/students/:id/certificates/:certId", deleteCertificate);

export default studentRouter;
