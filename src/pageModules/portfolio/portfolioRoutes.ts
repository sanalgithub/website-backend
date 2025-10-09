import { Router } from "express";
import {
  createPortfolio,
  deletePortfolio,
  editPortfolio,
  getAllPortfolios,
  getPortfolioById,
  updatePortfolioStatus,
} from "./portfolioController";
import verifyToken from "../../middleware/verifyToken";
import { portFolioUpload } from "../../config/multerConfig";

const router = Router();

router.post("/", verifyToken, portFolioUpload.single("files"), createPortfolio);

router.get("/", getAllPortfolios);

router.get("/:id", verifyToken, getPortfolioById);

router.put("/:id", portFolioUpload.single("files"), verifyToken, editPortfolio);

router.delete("/:id", verifyToken, deletePortfolio);

router.patch("/:id/status", verifyToken, updatePortfolioStatus);

export default router;
