import Student from "../models/Student.js";
import Employer from "../models/Employer.js";
import { comparePassword } from "../utils/bcryptPasswordHash.js";
import { generateNewToken } from "../utils/tokens.js";

export const login = async (req, res) => {
  try {
    let userType = "student";
    const { email, password } = req.body;
    let user = await Student.find({
      email,
    });
    if (!user) {
      user = await Employer.find({
        email,
      });
      if (!user) {
        return res.status(404).json({ message: "email or password is wrong" });
      }
      userType = "employer";
    }
    const isPasswordMatching = await comparePassword(password, user.password);
    if (!isPasswordMatching) {
      return res.status(401).json({ message: "email or password is wrong" });
    }
    const dataToSendInToken = {
      userId: user._id,
      type: userType,
    };
    const accessToken = generateNewToken(dataToSendInToken, "1h");
    res.status(200).json({ user, accessToken });
  } catch (error) {
    console.log("Error while trying to login");
    console.log(error);
    res.send(500).json({ message: "something went wrong" });
  }
};
