import express from "express";
import {
  createContact,
  getAllGalleries,
  getAllServices,
  getAllTestimonials,
  getAllBlogs,
  getBlogById,
  getAllPortfolios,
  getServiceById,
} from "../../siteModules/sitePages/sitePagesController";

const router = express.Router();

router.post("/contactUs", createContact);
router.get("/gallery", getAllGalleries);
router.get("/service", getAllServices);
router.get("/service/:id", getServiceById);
router.get("/testimonial", getAllTestimonials);
router.get("/blog", getAllBlogs);
router.get("/blog/:id", getBlogById);
router.get("/portfolio", getAllPortfolios);

export default router;
