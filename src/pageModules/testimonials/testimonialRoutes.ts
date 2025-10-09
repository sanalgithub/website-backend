import { Router } from "express";
import {
  createTestimonial,
  deleteTestimonial,
  editTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updatedTestimonialStatus,
} from "./testimonialController";
import verifyToken from "../../middleware/verifyToken";
import { testimonialUpload } from "../../config/multerConfig";

const router = Router();

router.post(
  "/",
  verifyToken,
  testimonialUpload.single("files"),
  createTestimonial,
);
router.get("/", getAllTestimonials);
router.get("/:id", verifyToken, getTestimonialById);
router.put(
  "/:id",
  testimonialUpload.single("files"),
  verifyToken,
  editTestimonial,
);
router.delete("/:id", verifyToken, deleteTestimonial);
router.patch("/:id/status", verifyToken, updatedTestimonialStatus);

export default router;
