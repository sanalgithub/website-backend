import mongoose from "mongoose";
import config from "./config";

const { mongoURI, dbName } = config;

let db: mongoose.Connection | null = null;

const connectDB = async () => {
  try {
    if (!mongoURI || !dbName) {
      throw new Error("mongoURI and dbName must be defined");
      
    }

    if (!db) {
      await mongoose.connect(mongoURI, {
        dbName,
      });
      db = mongoose.connection;

      db.on("error", (error) => {
        console.error("MongoDB connection error:", error);
      });

      db.once("open", () => {
        console.log("Connected to MongoDB");
      });
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
};

export { connectDB, getDB };
