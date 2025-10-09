import express from "express";
import {
  createService,
  editService,
  getServiceById,
  deleteService,
  getAllServices,
  updateServiceStatus,
} from "./serviceController";
import verifyToken from "../../middleware/verifyToken";
import { serviceUpload } from "../../config/multerConfig";

const router = express.Router();

router.post("/", verifyToken, serviceUpload.single("files"), createService);
router.put("/:id", verifyToken, serviceUpload.single("files"), editService);
router.get("/:id", verifyToken, getServiceById);
router.delete("/:id", verifyToken, deleteService);
router.get("/", getAllServices);
router.patch("/:id/status", verifyToken, updateServiceStatus);

export default router;
