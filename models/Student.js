import mongoose from "mongoose";
const { Schema } = mongoose;
import { ufcCourses } from "../constants/universityCourses.js";

const studentSchema = new Schema({
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
  course: {
    type: String,
    enum: ufcCourses,
    required: true,
  },
  entrySemester: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  graduationForecast: {
    type: String, // Ex: "2025.2"
  },

  profileImage: {
    type: String, // URL
    default: "",
  },

  skills: {
    type: [String],
    default: [],
  },

  experiences: {
    type: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        title: String,
        company: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],
    default: [],
  },

  projects: {
    type: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        name: String,
        description: String,
        type: {
          type: String,
          enum: ["personal", "academic"],
        },
        link: String,
      },
    ],
    default: [],
  },

  articles: {
    type: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        title: String,
        summary: String,
        url: String,
        publishedAt: Date,
      },
    ],
    default: [],
  },

  certificates: {
    type: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        title: String,
        organization: String,
        url: String,
        issuedAt: Date,
      },
    ],
    default: [],
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
