import mongoose from "mongoose";
import Blog, { BlogDocument } from "../../models/blogModel";

export const createBlog = async (
  blogData: Partial<BlogDocument>,
): Promise<BlogDocument> => {
  const blog = new Blog(blogData);
  return blog.save();
};

export const findBlogById = async (
  blogId: string,
): Promise<BlogDocument | null> => {
  return Blog.findById(blogId);
};

export const updateBlog = async (
  blogId: string,
  blogData: Partial<BlogDocument>,
): Promise<BlogDocument | null> => {
  return Blog.findByIdAndUpdate(
    blogId,
    { $set: blogData },
    { new: true, runValidators: true },
  );
};

export const deleteBlog = async (
  blogId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<BlogDocument | null> => {
  return Blog.findByIdAndUpdate(
    blogId,
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
export const getAllBlogs = async (): Promise<BlogDocument[]> => {
  return Blog.find({ isDeleted: false });
};

export const changeBlogStatus = async (
  blogId: string,
  status: boolean,
): Promise<BlogDocument | null> => {
  return Blog.findByIdAndUpdate(
    blogId,
    {
      $set: {
        status,
      },
    },
    { new: true, runValidators: true },
  );
};
