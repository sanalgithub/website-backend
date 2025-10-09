import { Response } from "express";
import * as blogService from "./blogService";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";

export const createBlog = async (req: RequestWithAuthData, res: Response) => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: message.UNAUTHORIZED });
      return;
    }
    const blogData = {
      ...req.body,
      createdBy: req.userId,
    };

    const imageUrl: string = req.file
      ? `/uploads/blog/${req.file.filename}`
      : "";
    blogData.imageUrl = imageUrl;
    const createdBlog = await blogService.createBlog(blogData);

    res.status(201).json({
      success: true,
      message: message.BLOG_CREATED,
      blog: createdBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
export const editBlog = async (req: RequestWithAuthData, res: Response) => {
  const { id } = req.params;
  const blogData = {
    ...req.body,
    updatedBy: req.userId,
  };

  try {
    if (!req.userId) {
      res.status(401).json({ message: message.UNAUTHORIZED });
      return;
    }

    const existingBlog = await blogService.getBlogById(id);
    if (!existingBlog) {
      return res
        .status(204)
        .json({ success: false, message: message.BLOG_NOT_FOUND });
    }

    if (req.file) {
      blogData.imageUrl = `/uploads/blog/${req.file.filename}`;
    } else {
      blogData.imageUrl = existingBlog.imageUrl;
    }

    const updatedBlog = await blogService.editBlog(id, blogData);

    res.status(200).json({
      success: true,
      message: message.BLOG_UPDATED,
      blog: updatedBlog,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteBlog = async (req: RequestWithAuthData, res: Response) => {
  const { id } = req.params;
  if (!req.userId) {
    res.status(401).json({ message: message.UNAUTHORIZED });
    return;
  }

  try {
    const deletedBlog = await blogService.deleteBlog(id, req.userId);
    if (!deletedBlog) {
      return res
        .status(204)
        .json({ success: false, message: message.BLOG_NOT_FOUND });
    }
    res.status(200).json({ success: true, message: message.BLOG_DELETED });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getBlogById = async (req: RequestWithAuthData, res: Response) => {
  const { id } = req.params;

  try {
    const blog = await blogService.getBlogById(id);
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

export const getAllBlogs = async (req: RequestWithAuthData, res: Response) => {
  try {
    const blogs = await blogService.getAllBlogs();
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

export const updatedBlogStatus = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!req.userId) {
      return res.status(401).json({ message: message.UNAUTHORIZED });
    }

    const updatedBlog = await blogService.updateBlogStatus(id, status);

    if (!updatedBlog) {
      return res
        .status(204)
        .json({ success: false, message: message.FAILED_TO_UPDATE_BLOG });
    }

    return res.status(200).json({
      success: true,
      message: message.BLOG_STATUS_UPDATED,
      blog: updatedBlog,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
