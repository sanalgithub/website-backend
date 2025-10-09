import mongoose, { Schema, Document } from "mongoose";

export interface MetaInfo {
  metaTitle: string;
  metaDescription: string;
  metaAuthor: string;
  metaKeywords: string[];
}

export interface ServiceDocument extends Document {
  serviceUrl: string;
  serviceTitle: string;
  serviceCode: string;
  name: string;
  shortDescription: string;
  description: string;
  content: string;
  meta: MetaInfo[];
  metaTags: string[];
  isDeleted: boolean;
  imageUrl: string;
  createdBy: mongoose.Types.ObjectId;
  deletedBy: mongoose.Types.ObjectId | null;
  updatedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  status: boolean;
}

const ServiceSchema: Schema<ServiceDocument> = new Schema<ServiceDocument>(
  {
    serviceUrl: { type: String, required: true },
    serviceTitle: { type: String, required: true },
    serviceCode: { type: String },
    name: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    meta: [
      {
        metaTitle: { type: String },
        metaDescription: { type: String },
        metaAuthor: { type: String },
        metaKeywords: [{ type: String }],
      },
    ],
    metaTags: [{ type: String }],
    isDeleted: { type: Boolean, default: false },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: { type: String },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },

    deletedAt: { type: Date, default: null },
    status: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } },
);

export default mongoose.model<ServiceDocument>("Service", ServiceSchema);
