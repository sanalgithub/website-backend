import express from "express";
import {
  createWebsiteSettings,
  editWebsiteSettings,
  getWebsiteSettingsById,
  deleteWebsiteSettings,
  getAllWebsiteSettings,
  updateWebsiteSettingsStatus,
} from "./websiteSettingsController";
import verifyToken from "../../middleware/verifyToken";
import { websiteSettingsUpload } from "../../config/multerConfig";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  websiteSettingsUpload.single("files"),
  createWebsiteSettings,
);
router.put(
  "/:id",
  verifyToken,
  websiteSettingsUpload.single("files"),
  editWebsiteSettings,
);
router.get("/:id", verifyToken, getWebsiteSettingsById);
router.delete("/:id", verifyToken, deleteWebsiteSettings);
router.get("/", getAllWebsiteSettings);
router.patch("/:id/status", verifyToken, updateWebsiteSettingsStatus);

export default router;
