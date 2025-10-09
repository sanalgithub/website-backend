import { Request, Response } from "express";
import * as galleryService from "./galleryService"; // Corrected spelling from galleyService to galleryService
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";

export const createGallery = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ success: false, message: message.UNAUTHORIZED });
    }

    const galleryData = {
      ...req.body,
      createdBy: req.userId,
    };

    const imageUrl: string[] = (req.files as Express.Multer.File[])
      ? (req.files as Express.Multer.File[]).map(
          (file) => `/uploads/gallery/${file.filename}`,
        )
      : [];

    galleryData.imageUrl = imageUrl;

    const createdGallery = await galleryService.createGalleryItem(galleryData);

    if (createdGallery) {
      return res.status(201).json({
        success: true,
        message: message.GALLERY_CREATED,
        gallery: createdGallery,
      });
    } else {
      return res.status(204).json({
        success: false,
        message: message.FAILED_TO_ADD_GALLERY,
        gallery: createdGallery,
      });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const editGallery = async (req: RequestWithAuthData, res: Response) => {
  const { id } = req.params;
  const galleryData = {
    ...req.body,
    updatedBy: req.userId,
  };

  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ success: false, message: message.UNAUTHORIZED });
    }

    const existingGallery = await galleryService.getGalleryItemById(id);
    if (!existingGallery) {
      return res
        .status(204)
        .json({ success: false, message: message.GALLERY_NOT_FOUND });
    }

    const uploadedFiles: string[] = (req as any).files
      ? (req as any).files.map(
          (file: Express.Multer.File) => `/uploads/gallery/${file.filename}`,
        )
      : [];

    if (uploadedFiles.length > 0) {
      galleryData.imageUrl = existingGallery.imageUrl
        ? [...existingGallery.imageUrl, ...uploadedFiles]
        : uploadedFiles;
    } else {
      galleryData.imageUrl = existingGallery.imageUrl;
    }

    const updatedGallery = await galleryService.editGalleryItem(
      id,
      galleryData,
    );

    return res.status(200).json({
      success: true,
      message: message.GALLERY_UPDATED,
      gallery: updatedGallery,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteGallery = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      res.status(401).json({ success: false, message: message.UNAUTHORIZED });
      return;
    }

    const deletedGallery = await galleryService.deleteGalleryItem(
      id,
      req.userId,
    );
    if (!deletedGallery) {
      return res
        .status(204)
        .json({ success: false, message: message.GALLERY_NOT_FOUND });
    }

    res.status(200).json({ success: true, message: message.GALLERY_DELETED });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getGalleryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const gallery = await galleryService.getGalleryItemById(id);
    if (!gallery) {
      return res
        .status(204)
        .json({ success: false, message: message.GALLERY_NOT_FOUND });
    }

    res.status(200).json({ success: true, gallery });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllGalleries = async (req: Request, res: Response) => {
  try {
    const galleries = await galleryService.getAllGalleryItems();

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

export const updateGalleryStatus = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!req.userId) {
      return res.status(401).json({ message: message.UNAUTHORIZED });
    }

    const updatedGallery = await galleryService.updateStatus(id, status);

    if (!updatedGallery) {
      return res
        .status(204)
        .json({ success: false, message: message.GALLERY_NOT_FOUND });
    }

    res.status(200).json({
      success: true,
      message: message.GALLERY_STATUS_UPDATED,
      gallery: updatedGallery,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
