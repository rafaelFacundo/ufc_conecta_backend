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
