import { config } from "dotenv";
import mongoose from "mongoose";

config();

const { MONGO_URL } = process.env;

const connectMongoDB = async () => {
  try {
    if (!MONGO_URL) {
      throw new Error("MongoDB URL not found");
    }
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectMongoDB;
