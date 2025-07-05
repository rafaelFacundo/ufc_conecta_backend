import mongoose from "mongoose";
const { Schema } = mongoose;
import { employerProfiles } from "../constants/employerProfiles.js";

const employerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 255,
  },
  email: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
    enum: employerProfiles,
  },
  password: {
    type: String,
    required: true,
  },
});

const Employer = mongoose.model("Employer", employerSchema);

export default Employer;
