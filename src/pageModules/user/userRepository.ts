import User, { UserDocument } from "../../models/userModel";

export const create = async (
  userData: Partial<UserDocument>,
): Promise<UserDocument> => {
  const user = new User(userData);
  return await user.save();
};

export const findByEmail = async (
  email: string,
): Promise<UserDocument | null> => {
  return User.findOne({ email }).exec();
};

export const update = async (
  userId: string,
  updatedData: Partial<UserDocument>,
): Promise<UserDocument | null> => {
  return User.findByIdAndUpdate(userId, updatedData, {
    new: true,
    runValidators: true,
  }).exec();
};
