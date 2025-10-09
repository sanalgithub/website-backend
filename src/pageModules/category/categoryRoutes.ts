import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
  getCategoryById,
  updatedCategoryStatus,
} from "./categoryController";
import verifyToken from "../../middleware/verifyToken";

const router = Router();

router.post("/", verifyToken, createCategory);
router.get("/", getAllCategories);
router.get("/:id", verifyToken, getCategoryById);
router.put("/:id", verifyToken, editCategory);
router.delete("/:id", verifyToken, deleteCategory);
router.patch("/:id/status", verifyToken, updatedCategoryStatus);

export default router;
