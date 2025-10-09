import mongoose from "mongoose";
import { CategoryDocument } from "../../models/categoryModel";
import * as categoryRepository from "./categoryRepository";
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

export const createCategory = async (
  categoryData: Partial<CategoryDocument>,
): Promise<CategoryDocument> => {
  try {
    logger.info("Creating a new category", { categoryData });

    return await categoryRepository.createCategory(categoryData);
  } catch (error: any) {
    logger.error(`Error creating category: ${error.message}`, {
      stack: error.stack,
    });
    throw new Error(`Error creating category: ${error.message}`);
  }
};

export const existCategoryName = async (categoryName: string) => {
  return categoryRepository.existingCategoryName(categoryName);
};

export const editCategory = async (
  categoryId: string,
  categoryData: Partial<CategoryDocument>,
): Promise<CategoryDocument | null> => {
  try {
    logger.info(`Editing category with ID ${categoryId}`, { categoryData });

    const updatedCategory = await categoryRepository.updateCategory(
      categoryId,
      categoryData,
    );
    if (!updatedCategory) {
      const notFoundMessage = `Category with ID ${categoryId} not found`;
      logger.warn(notFoundMessage);
      throw new Error(notFoundMessage);
    }
    return updatedCategory;
  } catch (error: any) {
    logger.error(`Error updating category: ${error.message}`, {
      stack: error.stack,
    });
    throw new Error(`Error updating category: ${error.message}`);
  }
};

export const deleteCategory = async (
  categoryId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<CategoryDocument | null> => {
  try {
    const deletedById = new mongoose.Types.ObjectId(deletedBy);
    logger.info(
      `Deleting category with ID ${categoryId} by user ${deletedById}`,
    );

    const deletedCategory = await categoryRepository.deleteCategory(
      categoryId,
      deletedById,
    );
    if (!deletedCategory) {
      const notFoundMessage = `Category with ID ${categoryId} not found`;
      logger.warn(notFoundMessage);
      throw new Error(notFoundMessage);
    }
    return deletedCategory;
  } catch (error: any) {
    logger.error(`Error deleting category: ${error.message}`, {
      stack: error.stack,
    });
    throw new Error(`Error deleting category: ${error.message}`);
  }
};

export const getCategoryById = async (
  categoryId: string,
): Promise<CategoryDocument | null> => {
  try {
    logger.info(`Fetching category with ID ${categoryId}`);

    const category = await categoryRepository.findCategoryById(categoryId);
    if (!category) {
      const notFoundMessage = `Category with ID ${categoryId} not found`;
      logger.warn(notFoundMessage);
      throw new Error(notFoundMessage);
    }
    return category;
  } catch (error: any) {
    logger.error(`Error fetching category: ${error.message}`, {
      stack: error.stack,
    });
    throw new Error(`Error fetching category: ${error.message}`);
  }
};

export const getAllCategories = async (): Promise<CategoryDocument[]> => {
  try {
    logger.info("Fetching all categories");

    return await categoryRepository.getAllCategories();
  } catch (error: any) {
    logger.error(`Error fetching categories: ${error.message}`, {
      stack: error.stack,
    });
    throw new Error(`Error fetching categories: ${error.message}`);
  }
};

export const updateCategoryStatus = async (
  categoryId: string,
  status: boolean,
): Promise<CategoryDocument | null> => {
  try {
    logger.info(
      `Updating status of category with ID ${categoryId} to ${status}`,
    );

    const updatedCategory = await categoryRepository.changeCategoryStatus(
      categoryId,
      status,
    );
    if (!updatedCategory) {
      const notFoundMessage = `Category with ID ${categoryId} not found`;
      logger.warn(notFoundMessage);
      throw new Error(notFoundMessage);
    }
    return updatedCategory;
  } catch (error: any) {
    logger.error(`Error updating category status: ${error.message}`, {
      stack: error.stack,
    });
    throw new Error(`Error updating category status: ${error.message}`);
  }
};
