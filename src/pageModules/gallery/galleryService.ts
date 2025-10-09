import mongoose from "mongoose";
import { GalleryDocument } from "../../models/galleryModel";
import * as galleryRepository from "./galleryRepository";
import { createLogger, format, transports } from "winston";
import * as categoryService from "../category/categoryService";
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
export const createGalleryItem = async (
  galleryData: Partial<GalleryDocument>,
): Promise<GalleryDocument> => {
  try {
    const categories = await categoryService.getAllCategories();
    const categoryExists = categories.some(
      (category: { categoryName: string | undefined }) =>
        category.categoryName === galleryData.categoryName,
    );

    if (
      galleryData.type === "Photo" &&
      (!galleryData.imageUrl || galleryData.imageUrl.length === 0)
    ) {
      throw new Error("Image URL is required for photo types.");
    }

    if (galleryData.type === "Video" && !galleryData.videoUrl) {
      throw new Error("Video URL is required for video types.");
    }

    if (!categoryExists) {
      throw new Error(`Category "${galleryData.categoryName}" does not exist.`);
    }

    logger.info("Creating a new gallery item", { galleryData });

    return await galleryRepository.createGallery(galleryData);
  } catch (error: any) {
    throw new Error(`Error creating gallery item: ${error.message}`);
  }
};

export const editGalleryItem = async (
  galleryId: string,
  galleryData: Partial<GalleryDocument>,
): Promise<GalleryDocument | null> => {
  try {
    logger.info(`Editing gallery item with ID ${galleryId}`, {
      galleryData,
    });
    const categories = await categoryService.getAllCategories();
    const categoryExists = categories.some(
      (category: { categoryName: string | undefined }) =>
        category.categoryName === galleryData.categoryName,
    );

    if (
      galleryData.type === "photo" &&
      (!galleryData.imageUrl || galleryData.imageUrl.length === 0)
    ) {
      throw new Error("Image URL is required for photo types.");
    }

    if (galleryData.type === "video" && !galleryData.videoUrl) {
      throw new Error("Video URL is required for video types.");
    }

    if (!categoryExists) {
      throw new Error(`Category "${galleryData.categoryName}" does not exist.`);
    }
    const updatedGalleryItem = await galleryRepository.updateGallery(
      galleryId,
      galleryData,
    );
    if (!updatedGalleryItem) {
      throw new Error(`Gallery item with ID ${galleryId} not found`);
    }
    return updatedGalleryItem;
  } catch (error: any) {
    throw new Error(`Error updating gallery item: ${error.message}`);
  }
};

export const deleteGalleryItem = async (
  galleryId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<GalleryDocument | null> => {
  try {
    const deletedById = new mongoose.Types.ObjectId(deletedBy);
    logger.info(
      `Deleting gallery item with ID ${galleryId} by user ${deletedById}`,
    );

    const deletedGalleryItem = await galleryRepository.deleteGallery(
      galleryId,
      deletedById,
    );
    if (!deletedGalleryItem) {
      throw new Error(`Gallery item with ID ${galleryId} not found`);
    }
    return deletedGalleryItem;
  } catch (error: any) {
    throw new Error(`Error deleting gallery item: ${error.message}`);
  }
};

export const getGalleryItemById = async (
  galleryId: string,
): Promise<GalleryDocument | null> => {
  try {
    logger.info(`Fetching gallery item with ID ${galleryId}`);

    const galleryItem = await galleryRepository.findGalleryById(galleryId);
    if (!galleryItem) {
      throw new Error(`Gallery item with ID ${galleryId} not found`);
    }
    return galleryItem;
  } catch (error: any) {
    throw new Error(`Error fetching gallery item: ${error.message}`);
  }
};

export const getAllGalleryItems = async (): Promise<GalleryDocument[]> => {
  try {
    logger.info("Fetching all gallery items");

    return await galleryRepository.getAllGalleries();
  } catch (error: any) {
    throw new Error(`Error fetching gallery items: ${error.message}`);
  }
};

export const updateStatus = async (
  galleryId: string,
  status: boolean,
): Promise<GalleryDocument | null> => {
  return await galleryRepository.changeGalleryStatus(galleryId, status);
};
