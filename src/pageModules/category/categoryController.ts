import { Request, Response } from "express";
import * as categoryService from "./categoryService";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";
export const createCategory = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ success: false, message: message.UNAUTHORIZED });
    }

    const categoryData = {
      ...req.body,
      createdBy: req.userId,
    };

    if (!categoryData.categoryName) {
      return res
        .status(400)
        .json({ success: false, message: "Category name is required" });
    }

    const existingCategory = await categoryService.existCategoryName(
      categoryData.categoryName,
    );
    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: message.CATEGORY_ALREADY_EXISTS,
      });
    }

    const createdCategory = await categoryService.createCategory(categoryData);
    if (createdCategory) {
      return res.status(201).json({
        success: true,
        message: message.CATEGORY_CREATED_SUCCESS,
        category: createdCategory,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: message.FAILED_TO_CREATE_CATEGORY,
      });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const editCategory = async (req: RequestWithAuthData, res: Response) => {
  const { id } = req.params;
  const categoryData = {
    ...req.body,
    updatedBy: req.userId,
  };

  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ success: false, message: message.UNAUTHORIZED });
    }

    if (!categoryData.categoryName) {
      return res
        .status(400)
        .json({ success: false, message: "Category name is required" });
    }

    const existingCategoryName = await categoryService.existCategoryName(
      categoryData.categoryName,
    );
    if (existingCategoryName) {
      return res.status(409).json({
        success: false,
        message: message.CATEGORY_ALREADY_EXISTS,
      });
    }

    const existingCategory = await categoryService.getCategoryById(id);
    if (!existingCategory) {
      return res
        .status(204)
        .json({ success: false, message: message.CATEGORY_NOT_FOUND });
    }

    const updatedCategory = await categoryService.editCategory(
      id,
      categoryData,
    );

    return res.status(200).json({
      success: true,
      message: message.CATEGORY_UPDATED_SUCCESS,
      category: updatedCategory,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteCategory = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ success: false, message: message.UNAUTHORIZED });
    }

    const deletedCategory = await categoryService.deleteCategory(
      id,
      req.userId,
    );
    if (!deletedCategory) {
      return res
        .status(204)
        .json({ success: false, message: message.CATEGORY_NOT_FOUND });
    }

    return res
      .status(200)
      .json({ success: true, message: message.CATEGORY_DELETED });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const category = await categoryService.getCategoryById(id);
    if (!category) {
      return res
        .status(204)
        .json({ success: false, message: message.CATEGORY_NOT_FOUND });
    }

    return res.status(200).json({ success: true, category });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    if (categories) {
      return res.status(200).json({ success: true, categories });
    } else {
      return res.status(204).json({
        success: false,
        message: message.FAILED_TO_RETRIEVE_CATEGORY,
      });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const updatedCategoryStatus = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!req.userId) {
      return res.status(401).json({ message: message.UNAUTHORIZED });
    }

    const updatedCategory = await categoryService.updateCategoryStatus(
      id,
      status,
    );

    if (!updatedCategory) {
      return res
        .status(204)
        .json({ success: false, message: message.CATEGORY_NOT_FOUND });
    }

    return res.status(200).json({
      success: true,
      message: message.CATEGORY_STATUS_UPDATED,
      category: updatedCategory,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
