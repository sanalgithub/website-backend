import mongoose, { Document, Schema } from "mongoose";

export interface ContactUs extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  remarks: string;
}
export type ContactUsDocument = ContactUs & Document;

const ContactSchema: Schema<ContactUs> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    remarks: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ContactUs>("Contact", ContactSchema);
