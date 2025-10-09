import express from "express";
import {
  createGallery,
  editGallery,
  deleteGallery,
  getGalleryById,
  getAllGalleries,
  updateGalleryStatus,
} from "./galleryController";
import verifyToken from "../../middleware/verifyToken";
import { galleryUpload } from "../../config/multerConfig";

const router = express.Router();

router.post("/", verifyToken, galleryUpload.array("files"), createGallery);
router.put("/:id", verifyToken, galleryUpload.array("files"), editGallery);

router.get("/:id", verifyToken, getGalleryById);
router.delete("/:id", verifyToken, deleteGallery);
router.get("/", getAllGalleries);
router.patch("/:id/status", verifyToken, updateGalleryStatus);

export default router;
