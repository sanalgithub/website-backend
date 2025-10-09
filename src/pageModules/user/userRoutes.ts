import express from "express";
import { createUser, updateUser } from "./userController";
import verifyToken from "../../middleware/verifyToken";

const router = express.Router();

router.post("/", createUser);
router.put("/:id", verifyToken, updateUser);

export default router;
