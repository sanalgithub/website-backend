import mongoose from "mongoose";
import Testimonial, {
  TestimonialDocument,
} from "../../models/testimonialModel";

export const createTestimonial = async (
  testimonialData: Partial<TestimonialDocument>,
): Promise<TestimonialDocument> => {
  const testimonial = new Testimonial(testimonialData);
  return testimonial.save();
};

export const findTestimonialById = async (
  testimonialId: string,
): Promise<TestimonialDocument | null> => {
  return Testimonial.findById(testimonialId);
};

export const updateTestimonial = async (
  testimonialId: string,
  testimonialData: Partial<TestimonialDocument>,
): Promise<TestimonialDocument | null> => {
  return Testimonial.findByIdAndUpdate(
    testimonialId,
    { $set: testimonialData },
    { new: true, runValidators: true },
  );
};

export const deleteTestimonial = async (
  testimonialId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<TestimonialDocument | null> => {
  return Testimonial.findByIdAndUpdate(
    testimonialId,
    {
      $set: {
        isDeleted: true,
        deletedBy,
        deletedAt: new Date(),
      },
    },
    { new: true },
  );
};
export const getAllTestimonials = async (): Promise<TestimonialDocument[]> => {
  return Testimonial.find({ isDeleted: false });
};

export const changeTestimonialStatus = async (
  testimonialId: string,
  status: boolean,
): Promise<TestimonialDocument | null> => {
  return Testimonial.findByIdAndUpdate(
    testimonialId,
    {
      $set: {
        status,
      },
    },
    { new: true, runValidators: true },
  );
};
