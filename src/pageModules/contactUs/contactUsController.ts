import { Request, Response } from "express";
import * as contactService from "./contactUsService";
import { message } from "../../constants/responseMessage";

export const createContact = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { firstName, lastName, email, phone, remarks } = req.body;

  try {
    await contactService.createContact({
      firstName,
      lastName,
      email,
      phone,
      remarks,
    });

    return res
      .status(201)
      .json({ success: true, message: message.WELCOME_EMAIL });
  } catch (error: any) {
    return res.status(204).json({ success: false, message: error.message });
  }
};
