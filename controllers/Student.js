import Student from "../models/Student.js";
import { hashPassword } from "../utils/bcryptPasswordHash.js";

export const create = async (req, res) => {
  try {
    const { name, description, course, entrySemester, email, password } =
      req.body;
    const hashedPassword = await hashPassword(password);
    const newStudent = new Student({
      name,
      description,
      course,
      entrySemester,
      email,
      password: hashedPassword,
    });
    await newStudent.save();
    const newStudentObject = newStudent.toObject();
    delete newStudentObject.password;
    res.status(201).json(newStudentObject);
  } catch (error) {
    console.log("Something went wrong when trying to create save the student");
    console.log(error);
    res.status(400).json({
      message: "Something went wrong when trying to create save the student.",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);
    const studentObject = student.toObject();
    delete studentObject.password;
    res.status(200).json(studentObject);
  } catch (error) {
    console.log(
      "Something went wrong when trying to retreive save the student"
    );
    console.log(error);
    res.status(400).json({
      message:
        "Something went wrong when trying to retreive student informations.",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id, name, description, course, entrySemester, email } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        name,
        description,
        course,
        entrySemester,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.log("Something went wrong when trying to update save the student");
    console.log(error);
    res.status(400).json({
      message:
        "Something went wrong when trying to update student informations.",
    });
  }
};

export const getExperiences = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Student.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.experiences);
  } catch (error) {
    console.log("Something went wrong when trying to update save the student");
    console.log(error);
    res.status(400).json({
      message:
        "Something went wrong when trying to update student informations.",
    });
  }
};

export const addExperience = async (req, res) => {
  try {
    const { title, company, startDate, endDate, description } = req.body;
    const userId = req.params.id;
    const student = await Student.findById(userId);
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }
    student.experiences.push({
      title,
      company,
      startDate,
      endDate,
      description,
    });
    await student.save();

    res.status(201).json(student.experiences);
  } catch (error) {
    console.log("Something went wrong when trying to update save the student");
    console.log(error);
    res.status(400).json({
      message:
        "Something went wrong when trying to update student informations.",
    });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const { id, expId } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }
    const exp = student.experiences.id(expId);
    if (!exp) {
      return res.status(404).json({ error: "Experience not found" });
    }
    Object.assign(exp, req.body);
    await student.save();
    res.status(201).json(exp);
  } catch (error) {
    console.log("Something went wrong when trying to update save the student");
    console.log(error);
    res.status(400).json({
      message:
        "Something went wrong when trying to update student informations.",
    });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const { id, expId } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }
    const exp = student.experiences.id(expId);
    if (!exp) {
      return res.status(404).json({ error: "Experience not found" });
    }
    student.experiences.pull({ _id: expId });
    await student.save();

    res.status(204).json({ message: "Experience deleted successfuly" });
  } catch (error) {
    console.log("Something went wrong when trying to update save the student");
    console.log(error);
    res.status(400).json({
      message:
        "Something went wrong when trying to update student informations.",
    });
  }
};

export const getProject = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Student.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.projects);
  } catch (error) {
    console.log("Something went wrong when trying to update save the student");
    console.log(error);
    res.status(400).json({
      message:
        "Something went wrong when trying to update student informations.",
    });
  }
};

export const addProject = async (req, res) => {
  try {
    const { name, description, type, link } = req.body;
    const userId = req.params.id;
    const student = await Student.findById(userId);
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }
    student.projects.push({
      name,
      description,
      type,
      link,
    });
    await student.save();

    res.status(201).json(student.projects);
  } catch (error) {
    console.log("Something went wrong when trying to update save the student");
    console.log(error);
    res.status(400).json({
      message:
        "Something went wrong when trying to update student informations.",
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id, projId } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }
    const project = student.projects.id(projId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    Object.assign(project, req.body);
    await student.save();
    res.status(201).json(project);
  } catch (error) {
    console.log("Something went wrong when trying to update save the student");
    console.log(error);
    res.status(400).json({
      message:
        "Something went wrong when trying to update student informations.",
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id, projId } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }
    const project = student.projects.id(projId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    student.projects.pull({ _id: projId });

    await student.save();
    res.status(204).json({ message: "Project deleted successfuly" });
  } catch (error) {
    console.log("Something went wrong when trying to update save the student");
    console.log(error);
    res.status(400).json({
      message:
        "Something went wrong when trying to update student informations.",
    });
  }
};

export const getArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Student.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.articles);
  } catch (error) {
    console.log("Something went wrong when trying to update save the student");
    console.log(error);
    res.status(400).json({
      message:
        "Something went wrong when trying to update student informations.",
    });
  }
};

export const addArticle = async (req, res) => {
  try {
    const { title, summary, url, publishedAt } = req.body;
    const userId = req.params.id;
    const student = await Student.findById(userId);
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }
    student.articles.push({
      title,
      summary,
      url,
      publishedAt,
    });
    await student.save();

    res.status(201).json(student.articles);
  } catch (error) {
    console.log("Something went wrong when trying to update save the student");
    console.log(error);
    res.status(400).json({
      message:
        "Something went wrong when trying to update student informations.",
    });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { id, artcId } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }
    const article = student.articles.id(artcId);
    if (!article) {
      return res.status(404).json({ error: "article not found" });
    }
    Object.assign(article, req.body);
    await student.save();
    res.status(201).json(article);
  } catch (error) {
    console.log("Something went wrong when trying to update save the student");
    console.log(error);
    res.status(400).json({
      message:
        "Something went wrong when trying to update student informations.",
    });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id, artcId } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }
    const article = student.articles.id(artcId);
    if (!article) {
      return res.status(404).json({ error: "article not found" });
    }
    student.articles.pull({ _id: artcId });
    await student.save();
    res.status(204).json({ message: "Experience deleted successfuly" });
  } catch (error) {
    console.log("Something went wrong when trying to update save the student");
    console.log(error);
    res.status(400).json({
      message:
        "Something went wrong when trying to update student informations.",
    });
  }
};

export const addCertificate = async (req, res) => {
  try {
    const { title, organization, url, issuedAt } = req.body;
    const userId = req.params.id;
    const student = await Student.findById(userId);
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }
    student.certificates.push({
      title,
      organization,
      url,
      issuedAt,
    });
    await student.save();

    res.status(201).json(student.certificates);
  } catch (error) {
    console.log("Something went wrong when trying to update save the student");
    console.log(error);
    res.status(400).json({
      message:
        "Something went wrong when trying to update student informations.",
    });
  }
};

export const getCertificate = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Student.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.certificates);
  } catch (error) {
    console.log("Something went wrong when trying to update save the student");
    console.log(error);
    res.status(400).json({
      message:
        "Something went wrong when trying to update student informations.",
    });
  }
};

export const updateCertificate = async (req, res) => {
  try {
    const { id, certId } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }
    const certificate = student.certificates.id(certId);
    if (!certificate) {
      return res.status(404).json({ error: "certificate not found" });
    }
    Object.assign(certificate, req.body);
    await student.save();
    res.status(201).json(certificate);
  } catch (error) {
    console.log("Something went wrong when trying to update save the student");
    console.log(error);
    res.status(400).json({
      message:
        "Something went wrong when trying to update student informations.",
    });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    //const { title, company, startDate, endDate, description } = req.body;
    const { id, certId } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }
    const certificate = student.certificates.id(certId);
    if (!certificate) {
      return res.status(404).json({ error: "certificate not found" });
    }
    student.certificates.pull({ _id: certId });

    await student.save();
    res.status(204).json({ error: "certificate deleted" });
  } catch (error) {
    console.log("Something went wrong when trying to update save the student");
    console.log(error);
    res.status(400).json({
      message:
        "Something went wrong when trying to update student informations.",
    });
  }
};
