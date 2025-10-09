import mongoose, { Schema, Document } from "mongoose";

export interface Category extends Document {
  categoryName: string;
  createdBy: mongoose.Types.ObjectId;
  deletedBy: mongoose.Types.ObjectId | null;
  updatedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  status: boolean;
  isDeleted: boolean;
}

export type CategoryDocument = Category & Document;

const CategorySchema: Schema = new Schema<Category>({
  categoryName: { type: String, required: true, unique: true },

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

export default mongoose.model<CategoryDocument>("Category", CategorySchema);
