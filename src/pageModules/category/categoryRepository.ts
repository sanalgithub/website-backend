import mongoose from "mongoose";
import Category, { CategoryDocument } from "../../models/categoryModel";
export const createCategory = async (
  categoryData: Partial<CategoryDocument>,
): Promise<CategoryDocument> => {
  const category = new Category(categoryData);
  return category.save();
};

export const findCategoryById = async (
  categoryId: string,
): Promise<CategoryDocument | null> => {
  return Category.findById(categoryId);
};

export const existingCategoryName = async (
  categoryName: string,
): Promise<CategoryDocument | null> => {
  try {
    const category = await Category.findOne({ categoryName }).exec();
    return category;
  } catch (error) {
    console.error("Error finding category:", error);
    throw new Error("Database query failed");
  }
};

export const updateCategory = async (
  categoryId: string,
  categoryData: Partial<CategoryDocument>,
): Promise<CategoryDocument | null> => {
  return Category.findByIdAndUpdate(
    categoryId,
    { $set: categoryData },
    { new: true, runValidators: true },
  );
};

export const deleteCategory = async (
  categoryId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<CategoryDocument | null> => {
  return Category.findByIdAndUpdate(
    categoryId,
    {
      $set: {
        status: false,
        deletedBy,
        deletedAt: new Date(),
      },
    },
    { new: true },
  );
};

export const getAllCategories = async (): Promise<CategoryDocument[]> => {
  return Category.find({ isDeleted: false });
};

export const changeCategoryStatus = async (
  categoryId: string,
  status: boolean,
): Promise<CategoryDocument | null> => {
  return Category.findByIdAndUpdate(
    categoryId,
    {
      $set: {
        status,
      },
    },
    { new: true, runValidators: true },
  );
};
