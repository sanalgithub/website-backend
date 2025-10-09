import mongoose, { Schema, Document } from "mongoose";

export interface Gallery extends Document {
  name: string;
  categoryName: string;
  type: string;
  imageUrl: string[];
  videoUrl: string;
  createdBy: mongoose.Types.ObjectId;
  deletedBy: mongoose.Types.ObjectId | null;
  updatedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  status: boolean;
  isDeleted: boolean;
}

export type GalleryDocument = Gallery & Document;

const GallerySchema: Schema = new Schema<Gallery>({
  name: { type: String },
  categoryName: { type: String, required: true },

  type: { type: String, required: true },
  imageUrl: [{ type: String }],
  videoUrl: { type: String },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  status: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
});

export default mongoose.model<GalleryDocument>("Gallery", GallerySchema);
