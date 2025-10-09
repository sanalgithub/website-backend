import mongoose from "mongoose";
import { BlogDocument } from "../../models/blogModel";
import * as blogRepository from "./blogRepository";
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

export const createBlog = async (
  blogData: Partial<BlogDocument>,
): Promise<BlogDocument> => {
  try {
    logger.info("Creating a new blog", { blogData });

    if (!blogData.title || !blogData.description || !blogData.content) {
      throw new Error("Title, description, and content are required.");
    }

    return await blogRepository.createBlog(blogData);
  } catch (error: any) {
    throw new Error(`Error creating blog: ${error.message}`);
  }
};

export const editBlog = async (
  blogId: string,
  blogData: Partial<BlogDocument>,
): Promise<BlogDocument | null> => {
  try {
    logger.info(`Editing blog with ID ${blogId}`, { blogData });

    const updatedBlog = await blogRepository.updateBlog(blogId, blogData);

    if (!updatedBlog) {
      throw new Error(`Blog with ID ${blogId} not found`);
    }

    return updatedBlog;
  } catch (error: any) {
    throw new Error(`Error updating blog: ${error.message}`);
  }
};

export const deleteBlog = async (
  blogId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<BlogDocument | null> => {
  try {
    logger.info(`Deleting blog with ID ${blogId} by user ${deletedBy}`);

    const deletedById = new mongoose.Types.ObjectId(deletedBy);

    const deletedBlog = await blogRepository.deleteBlog(blogId, deletedById);

    if (!deletedBlog) {
      throw new Error(`Blog with ID ${blogId} not found`);
    }

    return deletedBlog;
  } catch (error: any) {
    throw new Error(`Error deleting blog: ${error.message}`);
  }
};

export const getBlogById = async (
  blogId: string,
): Promise<BlogDocument | null> => {
  try {
    logger.info(`Fetching blog with ID ${blogId}`);

    const blog = await blogRepository.findBlogById(blogId);

    if (!blog) {
      throw new Error(`Blog with ID ${blogId} not found`);
    }

    return blog;
  } catch (error: any) {
    throw new Error(`Error fetching blog: ${error.message}`);
  }
};

export const getAllBlogs = async (): Promise<BlogDocument[]> => {
  try {
    return await blogRepository.getAllBlogs();
  } catch (error: any) {
    throw new Error(`Error blog blogs: ${error.message}`);
  }
};

export const updateBlogStatus = async (
  blogId: string,
  status: boolean,
): Promise<BlogDocument | null> => {
  try {
    logger.info(`Updating status of blog with ID ${blogId} to ${status}`);

    const updatedBlog = await blogRepository.changeBlogStatus(blogId, status);
    if (!updatedBlog) {
      throw new Error(`blog with ID ${blogId} not found`);
    }
    return updatedBlog;
  } catch (error: any) {
    throw new Error(`Error updating blog status: ${error.message}`);
  }
};
