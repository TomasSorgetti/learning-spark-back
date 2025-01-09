import mongoose from "mongoose";
import { mongoConfig } from "../config";

export class MongoClient {
  private static instance: MongoClient;

  private constructor() {}

  public static getInstance(): MongoClient {
    if (!MongoClient.instance) {
      MongoClient.instance = new MongoClient();
    }
    return MongoClient.instance;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(mongoConfig.MONGO_URI);
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.log("Error connecting to MongoDB:", error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log("MongoDB disconnected successfully");
    } catch (error) {
      console.log("Error disconnecting from MongoDB:", error);
      throw error;
    }
  }
}
