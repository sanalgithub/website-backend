import { Router } from "express";
import { createContact } from "./contactUsController";
import verifyToken from "../../middleware/verifyToken";

const router = Router();

router.post("/", createContact);

export default router;
