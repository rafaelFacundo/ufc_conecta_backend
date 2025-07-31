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
  about: {
    type: String,
    required: false,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
  site: {
    type: String,
  },

  location: {
    type: String,
  },

  specializations: {
    type: [String],
    default: [],
  },

  contactEmail: {
    type: String,
  },

  profileImage: {
    type: String,
    default: "",
  },

  hiringRate: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
});

const Employer = mongoose.model("Employer", employerSchema);

export default Employer;
