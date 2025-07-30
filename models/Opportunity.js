import mongoose from "mongoose";
const { Schema } = mongoose;
import workLocations from "../constants/workLocations.js";

const opportunitySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  weeklyHours: {
    type: Number,
    required: true,
  },
  workLocation: {
    type: String,
    required: true,
    enum: Object.values(workLocations),
  },
  employer: {
    type: Schema.Types.ObjectId,
    ref: "Employer",
    required: true,
  },
  endDate: {
    type: String,
    require: true,
  },
  applicants: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    default: [],
  },
  contracts: {
    type: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: {
          type: String,
          enum: ["pending", "confirmed"],
          default: "pending",
        },
      },
    ],
    default: [],
  },
  refusedApplicants: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    default: [],
  },
});

const Opportunity = mongoose.model("Opportunity", opportunitySchema);

export default Opportunity;
