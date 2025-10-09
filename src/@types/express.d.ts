import { Request } from "express";
import mongoose from "mongoose";

export interface RequestWithAuthData extends Request {
  userId?: mongoose.Types.ObjectId;
}

export interface RequestWithFiles extends Request {
  files?:
    | {
        [fieldname: string]: Express.Multer.File[];
      }
    | Express.Multer.File[];
}
