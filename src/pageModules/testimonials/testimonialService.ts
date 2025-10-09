import mongoose from "mongoose";
import { TestimonialDocument } from "../../models/testimonialModel";
import * as testimonialRepository from "./testimonialRepository";
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

export default logger;

export const createTestimonial = async (
  testimonialData: Partial<TestimonialDocument>,
): Promise<TestimonialDocument> => {
  try {
    logger.info("Creating a new testimonial", { testimonialData });

    return await testimonialRepository.createTestimonial(testimonialData);
  } catch (error: any) {
    throw new Error(`Error creating testimonial: ${error.message}`);
  }
};

export const editTestimonial = async (
  testimonialId: string,
  testimonialData: Partial<TestimonialDocument>,
): Promise<TestimonialDocument | null> => {
  try {
    logger.info(`Editing testimonial with ID ${testimonialId}`, {
      testimonialData,
    });

    const updatedTestimonial = await testimonialRepository.updateTestimonial(
      testimonialId,
      testimonialData,
    );
    if (!updatedTestimonial) {
      throw new Error(`Testimonial with ID ${testimonialId} not found`);
    }
    return updatedTestimonial;
  } catch (error: any) {
    throw new Error(`Error updating testimonial: ${error.message}`);
  }
};

export const deleteTestimonial = async (
  testimonialId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<TestimonialDocument | null> => {
  try {
    const deletedById = new mongoose.Types.ObjectId(deletedBy);
    logger.info(
      `Deleting testimonial with ID ${testimonialId} by user ${deletedById}`,
    );

    const deletedTestimonial = await testimonialRepository.deleteTestimonial(
      testimonialId,
      deletedById,
    );
    if (!deletedTestimonial) {
      throw new Error(`Testimonial with ID ${testimonialId} not found`);
    }
    return deletedTestimonial;
  } catch (error: any) {
    throw new Error(`Error deleting testimonial: ${error.message}`);
  }
};

export const getTestimonialById = async (
  testimonialId: string,
): Promise<TestimonialDocument | null> => {
  try {
    logger.info(`Fetching testimonial with ID ${testimonialId}`);

    const testimonial =
      await testimonialRepository.findTestimonialById(testimonialId);
    if (!testimonial) {
      throw new Error(`Testimonial with ID ${testimonialId} not found`);
    }
    return testimonial;
  } catch (error: any) {
    throw new Error(`Error fetching testimonial: ${error.message}`);
  }
};

export const getAllTestimonials = async (): Promise<TestimonialDocument[]> => {
  try {
    logger.info("Fetching all testimonials");

    return await testimonialRepository.getAllTestimonials();
  } catch (error: any) {
    throw new Error(`Error fetching testimonials: ${error.message}`);
  }
};

export const updateStatus = async (
  testimonialId: string,
  status: boolean,
): Promise<TestimonialDocument | null> => {
  return testimonialRepository.changeTestimonialStatus(testimonialId, status);
};
