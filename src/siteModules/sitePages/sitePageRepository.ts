import Blog, { BlogDocument } from "../../models/blogModel";
import Contact, { ContactUsDocument } from "../../models/contactUsModel";
import Gallery, { GalleryDocument } from "../../models/galleryModel";
import Portfolio, { PortfolioDocument } from "../../models/portfolioModel";
import Service, { ServiceDocument } from "../../models/serviceModel";
import Testimonial, {
  TestimonialDocument,
} from "../../models/testimonialModel";

export const createContact = async (
  contactData: Partial<ContactUsDocument>
): Promise<ContactUsDocument> => {
  const contact = new Contact(contactData);
  return await contact.save();
};

export const getAllGalleries = async (): Promise<GalleryDocument[]> => {
  return Gallery.find({ isDeleted: false });
};

export const getAllServices = async (): Promise<ServiceDocument[]> => {
  return Service.find({ isDeleted: false });
};

export const getAllTestimonials = async (): Promise<TestimonialDocument[]> => {
  return Testimonial.find({ isDeleted: false });
};

export const getAllBlogs = async (): Promise<BlogDocument[]> => {
  return Blog.find({ isDeleted: false });
};

export const findBlogById = async (
  blogId: string
): Promise<BlogDocument | null> => {
  return Blog.findById(blogId);
};

export const getAllPortfolios = async (): Promise<PortfolioDocument[]> => {
  return Portfolio.find({ isDeleted: false });
};

export const findServiceById = async (
  serviceId: string
): Promise<ServiceDocument | null> => {
  return Service.findById(serviceId);
};
