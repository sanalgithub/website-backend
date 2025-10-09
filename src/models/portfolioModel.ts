import mongoose, { Schema, Document } from "mongoose";
import { UserDocument } from "./userModel";

export interface Portfolio extends Document {
  name: string;
  content: string;

  title: string;
  description: string;
  isDeleted: boolean;
  imageUrl: string;

  createdBy: mongoose.Types.ObjectId | UserDocument;
  updatedBy: mongoose.Types.ObjectId | UserDocument;
  deletedBy: mongoose.Types.ObjectId | UserDocument;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
}

export type PortfolioDocument = Portfolio & Document;

const PortfolioSchema: Schema<Portfolio> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    name: { type: String },
    content: { type: String, required: true },

    isDeleted: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
    deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
    deletedAt: { type: Date },
    imageUrl: { type: String },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model<PortfolioDocument>("Portfolio", PortfolioSchema);
