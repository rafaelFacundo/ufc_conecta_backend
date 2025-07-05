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
  },
  password: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
