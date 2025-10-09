import express from "express";
import {
  createPage,
  editPage,
  deletePage,
  getPageById,
  getAllPages,
  updatePageStatus,
} from "./pageController";
import verifyToken from "../../middleware/verifyToken";
import { pageUpload } from "../../config/multerConfig";

const router = express.Router();

router.post("/", verifyToken, pageUpload.single("files"), createPage);
router.put("/:id", verifyToken, pageUpload.single("files"), editPage);

router.get("/:id", verifyToken, getPageById);
router.delete("/:id", verifyToken, deletePage);
router.get("/", getAllPages);
router.patch("/:id/status", verifyToken, updatePageStatus);

export default router;
