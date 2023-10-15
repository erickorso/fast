import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI must be defined on .env");
}

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI);
    if (connection.readyState === 1) {
      console.log("mongodb is connected");
      return Promise.resolve(true);
    }

    
  } catch (error) {
    console.log("mongodb is not connected", {error});
    return Promise.reject(false);
  }
};
