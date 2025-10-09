import { UserDocument } from "../../models/userModel";
import { RequestWithAuthData } from "../../@types/express";
import * as userService from "./userService";
import { Response } from "express";
import { message } from "../../constants/responseMessage";
import mongoose from "mongoose";

export const createUser = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<void> => {
  try {
    const {
      name,
      email,
      phone,
      password,
      confirmPassword,
      companyAddress,
      companyName,
    } = req.body;

    if (password !== confirmPassword) {
      res
        .status(400)
        .json({ success: false, message: message.PASSWORD_MISMATCH });
      return;
    }

    const newUser = await userService.createUser({
      name,
      email,
      phone,
      password,
      companyAddress,
      companyName,
    });
    res
      .status(201)
      .json({ success: true, newUser, message: message.USER_CREATED });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUser = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: message.UNAUTHORIZED });
      return;
    }

    const updateData = req.body;
    const updatedBy: mongoose.Types.ObjectId = req.userId;

    if (updateData.password) {
      if (updateData.confirmPassword) {
        if (updateData.password !== updateData.confirmPassword) {
          res
            .status(400)
            .json({ success: false, message: message.PASSWORD_MISMATCH });
          return;
        }
      } else {
        res
          .status(400)
          .json({ success: false, message: message.CONFIRM_PASSWORD });
        return;
      }
    }

    const userData = {
      ...req.body,
      updatedBy,
    };
    const updatedUser: UserDocument | null = await userService.updateUser(
      req.params.id,
      userData,
    );
    if (updatedUser) {
      res.status(200).json({ status: true, updatedUser });
    } else {
      res.status(204).json({ status: false, message: message.USER_NOT_FOUND });
    }
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.message });
  }
};
