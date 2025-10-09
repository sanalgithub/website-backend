import { Request, Response } from "express";
import * as sitePagesService from "./sitePagesService";
import { message } from "../../constants/responseMessage";

export const createContact = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { firstName, lastName, email, phone, remarks } = req.body;
  try {
    await sitePagesService.createContact({
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

export const getAllGalleries = async (req: Request, res: Response) => {
  try {
    const galleries = await sitePagesService.getAllGalleryItems();

    if (galleries) {
      res.status(200).json({ success: true, galleries });
    } else {
      res.status(204).json({
        success: false,
        message: message.FAILED_TO_RETRIEVE_GALLERIES,
      });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error });
  }
};

export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await sitePagesService.findAllServices();
    if (services) {
      res.status(200).json({ success: true, services });
    } else {
      res
        .status(204)
        .json({ success: false, message: message.FAILED_TO_RETRIEVE_SERVICE });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await sitePagesService.getAllTestimonials();
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

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await sitePagesService.getAllBlogs();
    if (blogs) {
      res.status(200).json({ success: true, blogs });
    } else {
      res
        .status(204)
        .json({ success: false, message: message.FAILED_TO_RETRIEVE_BLOG });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const blog = await sitePagesService.getBlogById(id);
    if (!blog) {
      return res
        .status(204)
        .json({ success: false, message: message.BLOG_NOT_FOUND });
    }
    res.status(200).json({ success: true, blog });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllPortfolios = async (req: Request, res: Response) => {
  try {
    const portfolios = await sitePagesService.getAllPortfolios();
    if (portfolios) {
      return res.status(200).json({ success: true, portfolios });
    } else {
      return res.status(204).json({
        success: false,
        message: message.FAILED_TO_RETRIEVE_PORTFOLIOS,
      });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getServiceById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const service = await sitePagesService.findServiceById(id);
    if (!service || service.isDeleted) {
      return res
        .status(204)
        .json({ success: false, message: message.SERVICE_NOT_FOUND });
    }
    res.status(200).json({ success: true, service });
  } catch (error: any) {
    res.status(500).json({ success: true, error: error.message });
  }
};
