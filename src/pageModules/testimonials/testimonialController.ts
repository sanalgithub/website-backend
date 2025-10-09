import { Request, Response } from "express";
import * as testimonialService from "./testimonialService";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";
export const createTestimonial = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ success: false, message: message.UNAUTHORIZED });
    }

    const testimonialData = {
      ...req.body,
      createdBy: req.userId,
    };

    const imageUrl: string = req.file
      ? `/uploads/testimonial/${req.file.filename}`
      : "";
    testimonialData.imageUrl = imageUrl;

    const createdTestimonial =
      await testimonialService.createTestimonial(testimonialData);

    return res.status(201).json({
      success: true,
      message: message.TESTIMONIAL_CREATED_SUCCESS,
      testimonial: createdTestimonial,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
export const editTestimonial = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;
  const testimonialData = {
    ...req.body,
    updatedBy: req.userId,
  };

  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ success: false, message: message.UNAUTHORIZED });
    }
    const existingTestimonial = await testimonialService.getTestimonialById(id);
    if (!existingTestimonial) {
      return res
        .status(404)
        .json({ success: false, message: message.TESTIMONIAL_NOT_FOUND });
    }

    if (req.file) {
      testimonialData.imageUrl = `/uploads/testimonial/${req.file.filename}`;
    } else {
      testimonialData.imageUrl = existingTestimonial.imageUrl;
    }

    const updatedTestimonial = await testimonialService.editTestimonial(
      id,
      testimonialData,
    );

    return res.status(200).json({
      success: true,
      message: message.TESTIMONIAL_UPDATED_SUCCESS,
      testimonial: updatedTestimonial,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteTestimonial = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      res.status(401).json({ success: false, message: message.UNAUTHORIZED });
      return;
    }

    const deletedTestimonial = await testimonialService.deleteTestimonial(
      id,
      req.userId,
    );
    if (!deletedTestimonial) {
      return res
        .status(204)
        .json({ success: false, message: message.TESTIMONIAL_NOT_FOUND });
    }
    res
      .status(200)
      .json({ success: true, message: message.TESTIMONIAL_DELETED });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getTestimonialById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const testimonial = await testimonialService.getTestimonialById(id);
    if (!testimonial) {
      return res
        .status(204)
        .json({ success: false, message: message.TESTIMONIAL_NOT_FOUND });
    }
    res.status(200).json({ success: true, testimonial });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await testimonialService.getAllTestimonials();
    if (testimonials) {
      res.status(200).json({ success: true, testimonials });
    } else {
      res.status(204).json({
        success: false,
        message: message.FAILED_TO_RETRIEVE_TESTIMONIAL,
      });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: error });
  }
};

export const updatedTestimonialStatus = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!req.userId) {
      return res.status(401).json({ message: message.UNAUTHORIZED });
    }

    const updatedTestimonial = await testimonialService.updateStatus(
      id,
      status,
    );

    if (!updatedTestimonial) {
      return res
        .status(204)
        .json({ success: false, message: message.TESTIMONIAL_NOT_FOUND });
    }

    res.status(200).json({
      success: true,
      message: message.TESTIMONIAL_STATUS_UPDATED,
      testimonial: updatedTestimonial,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
