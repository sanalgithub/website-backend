import mongoose, { Schema, Document } from "mongoose";
import { UserDocument } from "./userModel";

export interface Testimonial extends Document {
  title: string;
  description: string;
  companyName: string;
  content: string;
  isDeleted: boolean;
  imageUrl: string;

  createdBy: mongoose.Types.ObjectId | UserDocument;
  updatedBy: mongoose.Types.ObjectId | UserDocument;
  deletedBy: mongoose.Types.ObjectId | null;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
}

export type TestimonialDocument = Testimonial & Document;

const TestimonialSchema: Schema<Testimonial> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    companyName: { type: String, required: true },

    content: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    deletedAt: { type: Date, default: null },
    imageUrl: { type: String },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model<TestimonialDocument>(
  "Testimonial",
  TestimonialSchema,
);
