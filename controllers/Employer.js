import Employer from "../models/Employer.js";
import Opportunity from "../models/Opportunity.js";
import RefreshToken from "../models/RefreshToken.js";
import { hashPassword } from "../utils/bcryptPasswordHash.js";
import { generateNewRefreshToken, generateNewToken } from "../utils/tokens.js";

export const create = async (req, res) => {
  try {
    console.log("LLLLLLLLLLLLLLL");
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
    const dataToSendInToken = {
      userId: newEmployer._id,
      type: "employer",
    };
    const dataToSendInRefreshToken = {
      userId: newEmployer._id,
    };
    const accessToken = generateNewToken(dataToSendInToken, "10d");
    const refreshToken = generateNewRefreshToken(
      dataToSendInRefreshToken,
      "10d"
    );
    await new RefreshToken({
      hash: refreshToken,
      userId: newEmployerObject._id,
      creationDate: Date.now(),
      isValid: true,
    }).save();
    res
      .status(201)
      .json({ accessToken, refreshToken, data: newEmployerObject });
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

export const getOpportunitiesByEmployer = async (req, res) => {
  try {
    const employerId = req.params.id;
    const opportunities = await Opportunity.find({ employer: employerId });
    res.status(200).json(opportunities);
  } catch (error) {
    console.log(
      "Something went wrong when trying to get opportunities by employer"
    );
    console.log(error);
    res.status(500).json({
      message:
        "Something went wrong when trying to get opportunities by employer",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const employers = await Employer.find();
    res.status(200).json(employers);
  } catch (error) {
    console.log("Something went wrong when trying to get employers");
    console.log(error);
    res.status(500).json({
      message: "Something went wrong when trying to get employers",
    });
  }
};
