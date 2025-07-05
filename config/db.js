import mongoose from "mongoose";

export const connectToDataBase = async () => {
  try {
    await mongoose.connect(process.env.DATA_BASE_URL2);
    console.log("conected to data base");
  } catch (error) {
    console.log("Something went wrong when trying to connect to data base");
    console.log(error);
  }
};
