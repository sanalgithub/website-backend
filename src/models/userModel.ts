import mongoose, { Schema, Document, Date } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  phone: string;

  password: string;
  companyAddress: string;
  companyName: string;
  createdAt: Date;
  updatedAt: Date;
  updatedBy: mongoose.Types.ObjectId | UserDocument;
}

export type UserDocument = User & Document;

const UserSchema: Schema<User> = new Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },

    password: { type: String, required: true },
    companyAddress: { type: String, required: true },
    companyName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  },
);

export default mongoose.model<UserDocument>("User", UserSchema);
