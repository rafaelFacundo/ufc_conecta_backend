import Employer from "../models/Employer.js";
import { hashPassword } from "../utils/bcryptPasswordHash.js";

export const create = async (req, res) => {
  try {
    const { name, description, profile, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newEmployer = new Employer({
      name,
      description,
      profile,
      email,
      password: hashedPassword,
    });
    await newEmployer.save();
    const newEmployerObject = newEmployer.toObject();
    delete newEmployerObject.password;
    res.status(201).json(newEmployerObject);
  } catch (error) {
    console.log("Something went wrong when trying to create save the student");
    console.log(error);
    res.status(400).json({
      message: "Something went wrong when trying to create save the student.",
    });
  }
};
