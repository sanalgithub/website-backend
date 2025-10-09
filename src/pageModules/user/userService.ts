import * as userRepository from "./userRepository";
import { UserDocument } from "../../models/userModel";
import bcrypt from "bcrypt";
import mongoose, { Date } from "mongoose";
import { message } from "../../constants/responseMessage";

interface CreateUserInput {
  name: string;
  email: string;
  phone: string;
  password: string;
  companyAddress: string;
  companyName: string;
}

export const createUser = async (
  userData: CreateUserInput,
): Promise<Partial<UserDocument>> => {
  const { password, ...otherUserData } = userData;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: Partial<UserDocument> = {
    ...otherUserData,
    password: hashedPassword,
  };
  const existingUser = await userRepository.findByEmail(userData.email);
  if (existingUser) {
    throw new Error(message.USER_EXISTS);
  }
  const createdUser = await userRepository.create(newUser);
  return createdUser;
};
export const updateUser = async (
  id: string,
  userData: Partial<UserDocument>,
): Promise<UserDocument | null> => {
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }
  return await userRepository.update(id, userData);
};
