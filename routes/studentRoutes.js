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
  getAppliedOpportunities,
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
import {
  authenticateStudent,
  authenticateStudentOrEmployer,
} from "../middlewares/auth.js";

const studentRouter = new Router();

studentRouter.post("/students/register", create);
studentRouter.get(
  "/students/:id/profile",
  authenticateStudentOrEmployer,
  getProfile
);
studentRouter.put("/students/:id/profile", authenticateStudent, updateProfile);

studentRouter.get(
  "/students/:id/experiences",
  authenticateStudentOrEmployer,
  getExperiences
);
studentRouter.put(
  "/students/:id/experiences/:expId",
  authenticateStudent,
  updateExperience
);
studentRouter.post(
  "/students/:id/experiences",
  authenticateStudent,
  addExperience
);
studentRouter.delete(
  "/students/:id/experiences/:expId",
  authenticateStudent,
  deleteExperience
);

studentRouter.get(
  "/students/:id/projects",
  authenticateStudentOrEmployer,
  getProject
);
studentRouter.put(
  "/students/:id/projects/:projId",
  authenticateStudent,
  updateProject
);
studentRouter.post("/students/:id/projects", authenticateStudent, addProject);
studentRouter.delete(
  "/students/:id/projects/:projId",
  authenticateStudent,
  deleteProject
);

studentRouter.get(
  "/students/:id/articles",
  authenticateStudentOrEmployer,
  getArticle
);
studentRouter.put(
  "/students/:id/articles/:artcId",
  authenticateStudent,
  updateArticle
);
studentRouter.post("/students/:id/articles", authenticateStudent, addArticle);
studentRouter.delete(
  "/students/:id/articles/:artcId",
  authenticateStudent,
  deleteArticle
);

studentRouter.get(
  "/students/:id/certificates",
  authenticateStudentOrEmployer,
  getCertificate
);
studentRouter.put(
  "/students/:id/certificates/:certId",
  authenticateStudent,
  updateCertificate
);
studentRouter.post(
  "/students/:id/certificates",
  authenticateStudent,
  addCertificate
);
studentRouter.delete(
  "/students/:id/certificates/:certId",
  authenticateStudent,
  deleteCertificate
);

studentRouter.get(
  "/students/:id/opportunities/applied",
  authenticateStudent,
  getAppliedOpportunities
);

export default studentRouter;
