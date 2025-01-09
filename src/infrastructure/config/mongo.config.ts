import dotenv from "dotenv";

dotenv.config();

export const mongoConfig = {
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017",
};
