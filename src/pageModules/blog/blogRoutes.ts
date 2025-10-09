import { Router } from "express";
import verifyToken from "../../middleware/verifyToken";
import { blogUpload } from "../../config/multerConfig";
import {
  createBlog,
  deleteBlog,
  editBlog,
  getBlogById,
  getAllBlogs,
  updatedBlogStatus,
} from "./blogController";

const router = Router();
router.post("/", verifyToken, blogUpload.single("files"), createBlog);

router.get("/", getAllBlogs);
router.get("/:id", verifyToken, getBlogById);
router.put("/:id", verifyToken, blogUpload.single("files"), editBlog);
router.delete("/:id", verifyToken, deleteBlog);
router.patch("/:id/status", verifyToken, updatedBlogStatus);

export default router;
