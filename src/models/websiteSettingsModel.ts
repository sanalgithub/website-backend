import mongoose, { Schema, Document } from "mongoose";

export interface SocialMedia {
  name: string;
  code?: string;
  icon: string;
  link: string;
  order: string;
}

export interface MenuLink {
  name: string;
  code?: string;
  link: string;
  menuType: string;
  order: string;
}

export interface WebsiteSettings extends Document {
  websiteName: string;
  address: string;
  officePhone: string;
  mobile: string;
  googleMapLink: string;
  numberOfProducts: string;
  numberOfClients: string;
  numberOfEmployees: string;
  email: string;
  socialMedia: SocialMedia[];
  menuLinks: MenuLink[];
  headerLogo: string;
  footerLogo: string;

  createdBy: mongoose.Types.ObjectId;
  deletedBy: mongoose.Types.ObjectId | null;
  updatedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  status: boolean;
  isDeleted: boolean;
}

export type WebsiteSettingsDocument = WebsiteSettings & Document;

const WebsiteSettingsSchema: Schema<WebsiteSettings> =
  new Schema<WebsiteSettingsDocument>(
    {
      websiteName: { type: String, required: true },
      address: { type: String, required: true },
      officePhone: { type: String, required: true },
      mobile: { type: String, required: true },
      googleMapLink: { type: String, required: true },
      numberOfProducts: { type: String, required: true },
      numberOfClients: { type: String, required: true },
      numberOfEmployees: { type: String, required: true },
      email: { type: String, required: true },
      socialMedia: [
        {
          name: { type: String },
          code: { type: String, default: "SETTINGS" },
          icon: { type: String },
          link: { type: String },
          order: { type: String },
        },
      ],
      menuLinks: [
        {
          name: { type: String },
          code: { type: String, default: "SETTINGS" },
          link: { type: String },
          menuType: { type: String },
          order: { type: String },
        },
      ],
      headerLogo: { type: String },
      footerLogo: { type: String },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
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
      isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
  );

export default mongoose.model<WebsiteSettingsDocument>(
  "WebsiteSettings",
  WebsiteSettingsSchema,
);
