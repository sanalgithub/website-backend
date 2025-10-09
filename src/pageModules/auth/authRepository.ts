import User, { UserDocument } from "../../models/userModel";

export const findByEmail = async (
  email: string,
): Promise<UserDocument | null> => {
  return await User.findOne({ email });
};
