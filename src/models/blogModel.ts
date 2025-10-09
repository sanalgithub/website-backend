import mongoose, { Schema, Document } from "mongoose";
import { UserDocument } from "./userModel";

export interface Blog extends Document {
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  isDeleted: boolean;
  comments: string[];
  status: boolean;

  createdBy: mongoose.Types.ObjectId | UserDocument;
  createdAt: Date;
  updatedBy: mongoose.Types.ObjectId | UserDocument;
  updatedAt: Date;
  deletedBy: mongoose.Types.ObjectId | UserDocument;
  deletedAt: Date;
}
export type BlogDocument = Blog & Document;

const BlogSchema: Schema<Blog> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    comments: [{ type: String }],

    isDeleted: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
    deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: Boolean, default: true },

    deletedAt: { type: Date },
  },
  { timestamps: true },
);

export default mongoose.model<BlogDocument>("Blog", BlogSchema);
