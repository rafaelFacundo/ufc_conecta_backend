import mongoose from "mongoose";
const { Schema } = mongoose;

const refreshTokenSchema = new Schema({
  hash: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
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

const RefreshToken = mongoose.model("RefreshTokens", refreshTokenSchema);
export default RefreshToken;
