import Administrator from "../models/Administrator.js";
import Student from "../models/Student.js";
import Employer from "../models/Employer.js";
import Opportunity from "../models/Opportunity.js";
import { hashPassword } from "../utils/bcryptPasswordHash.js";

export const create = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newAdm = new Administrator({
      username,
      password: hashedPassword,
    });
    await newAdm.save();
    res.status(200).json({ message: "New adm created succesfully" });
  } catch (error) {
    console.log("Error while creating administrator");
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong when trying creating adm" });
  }
};

export const deleteAdm = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedAdm = Administrator.findByIdAndDelete(id);
    if (!deletedAdm) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    console.log("Error while deleting administrator");
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong when trying delete adm" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const allStudents = await Student.find({});
    const AllEmployers = await Employer.find({});
    res.status(200).json({ users: [allStudents, AllEmployers] });
  } catch (error) {
    console.log("Something went wrong when trying to get all users");
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong when trying to get all users" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const studentUser = Student.findByIdAndDelete(id);
    if (!studentUser) {
      const employerUser = Employer.findByIdAndDelete(id);
      if (!employerUser) {
        return res.status(404).json({ message: "user not found" });
      }
    }
    return res.status(200).json({ message: "user deleted" });
  } catch (error) {
    console.log("Something went wrong when trying to delete user");
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong when trying to delete user" });
  }
};

export const getOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find({});
    res.status(200).json(opportunities);
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const deleteOpportunity = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedOpportunity = await Opportunity.findByIdAndDelete(id);
    if (!deletedOpportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }
    res.status(200).json(deletedOpportunity);
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};
