import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { UserDocument } from "../models/userModel";

config();

const generateToken = (user: UserDocument): string => {
  return jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

export default generateToken;
