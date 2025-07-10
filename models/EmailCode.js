import mongoose from "mongoose";
const { Schema } = mongoose;

const emailSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["unverified", "verified"],
    required: true,
  },
  creationDate: {
    type: Date,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: true,
  },
});

const EmailVerification = mongoose.model("EmailVerifications", emailSchema);

export default EmailVerification;
