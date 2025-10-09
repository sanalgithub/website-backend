import mongoose from "mongoose";
import Gallery, { GalleryDocument } from "../../models/galleryModel";

export const createGallery = async (
  galleryData: Partial<GalleryDocument>,
): Promise<GalleryDocument> => {
  const gallery = new Gallery(galleryData);
  return gallery.save();
};

export const findGalleryById = async (
  galleryId: string,
): Promise<GalleryDocument | null> => {
  return Gallery.findById(galleryId);
};

export const updateGallery = async (
  galleryId: string,
  galleryData: Partial<GalleryDocument>,
): Promise<GalleryDocument | null> => {
  return Gallery.findByIdAndUpdate(
    galleryId,
    { $set: galleryData },
    { new: true, runValidators: true },
  );
};

export const deleteGallery = async (
  galleryId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<GalleryDocument | null> => {
  return Gallery.findByIdAndUpdate(
    galleryId,
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

export const getAllGalleries = async (): Promise<GalleryDocument[]> => {
  return Gallery.find({ isDeleted: false });
};

export const changeGalleryStatus = async (
  galleryId: string,
  status: boolean,
): Promise<GalleryDocument | null> => {
  return Gallery.findByIdAndUpdate(
    galleryId,
    {
      $set: {
        status,
      },
    },
    { new: true, runValidators: true },
  );
};
