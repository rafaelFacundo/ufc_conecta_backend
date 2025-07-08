import mongoose from "mongoose";
const { Schema } = mongoose;

const admSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Administrator = mongoose.model("Administrators", admSchema);

export default Administrator;
