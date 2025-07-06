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

export const getProfile = async (req, res) => {
  try {
    const employerId = req.params.id;
    const employer = await Employer.findById(employerId);
    const employerObject = employer.toObject();
    delete employerObject.password;
    res.status(200).json(employerObject);
  } catch (error) {
    console.log("Something went wrong when trying to create save the employer");
    console.log(error);
    res.status(400).json({
      message:
        "Something went wrong when trying to retreive employer informations.",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id, name, description, profile, email } = req.body;
    const updatedEmployer = await Employer.findByIdAndUpdate(
      id,
      {
        name,
        description,
        profile,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedEmployer) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedEmployer);
  } catch (error) {
    console.log("Something went wrong when trying to update employer");
    console.log(error);
    res.status(400).json({
      message: "Something went wrong when trying to update employer",
    });
  }
};
