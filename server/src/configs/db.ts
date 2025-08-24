import mongoose from "mongoose";
import * as log4js from "log4js";
import * as dotenv from 'dotenv'

dotenv.config({})

const logger = log4js.getLogger();

const connectDatabase = async (): Promise<void> => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI!
    await mongoose.connect(MONGODB_URI);
    logger.info("Connected to MongoDB successfully");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectDatabase;