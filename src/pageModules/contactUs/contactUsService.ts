import { message } from "../../constants/responseMessage";
import * as contactRepository from "./contactUsRepository";
import nodemailer from "nodemailer";
import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
    }),
  ),
  transports: [new transports.Console()],
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface ContactInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  remarks: string;
}

export const createContact = async (
  contactData: ContactInput,
): Promise<any> => {
  try {
    // logger.info(
    //   `Creating contact for ${contactData.firstName} ${contactData.lastName}`
    // );

    const newContact = await contactRepository.createContact(contactData);

    const mailOptions = {
      from: `"Minute Designs" <${process.env.EMAIL_USER}>`,
      to: contactData.email,
      subject: "Welcome to Our Service!",
      text: `Hi ${contactData.firstName},\n\nThank you for contacting us. We have received your information and will get back to you shortly.\n\nBest regards,\nMinute Designs`,
    };

    await transporter.sendMail(mailOptions);

    // logger.info(`Welcome email sent to ${contactData.email}`);

    const enquiryMailOptions = {
      from: `"Minute Designs Support Team" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send the enquiry details to your team's email
      subject: "New Enquiry Received",
      text:
        `You have received a new enquiry from ${contactData.firstName} ${contactData.lastName}.\n\n` +
        `Email: ${contactData.email}\n` +
        `Phone: ${contactData.phone}\n` +
        `Remarks: ${contactData.remarks}\n\n` +
        `Please respond to the enquiry as soon as possible.`,
    };

    await transporter.sendMail(enquiryMailOptions);

    // logger.info(`Enquiry details email sent to ${process.env.EMAIL_USER}`);

    return {
      message: message.WELCOME_EMAIL,
      contact: newContact,
    };
  } catch (error) {
    logger.error(
      `Error creating contact for ${contactData.firstName} ${contactData.lastName}: ${error instanceof Error ? error.message : "Unknown error"}`,
    );

    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred",
    );
  }
};
