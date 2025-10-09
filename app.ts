import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./src/pageModules/auth/authRoutes";
import userRoutes from "./src/pageModules/user/userRoutes";
import contactRoutes from "./src/pageModules/contactUs/contactUsRoutes";
import blogRoutes from "./src/pageModules/blog/blogRoutes";
import pageRoutes from "./src/pageModules/cmspages/pageRoutes";
import testimonialRoutes from "./src/pageModules/testimonials/testimonialRoutes";
import serviceRoutes from "./src/pageModules/services/serviceRoutes";
import categoryRoutes from "./src/pageModules/category/categoryRoutes";
import portfolioRoutes from "./src/pageModules/portfolio/portfolioRoutes";
import galleryRoutes from "./src/pageModules/gallery/galleryRoutes";
import websiteSettingsRoutes from "./src/pageModules/websiteSettings/websiteSettingsRoutes";
import sitePageRoutes from './src/siteModules/sitePages/sitePageRoutes'
import { connectDB } from "./src/config/db";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

// Load environment variables
dotenv.config();

// Initialize Express application
const app: Application = express();

// Middleware setup
app.use(cookieParser());

// app.use(
//   cors({
//     origin: process.env.CLIENT_API || "*", // Allow all origins if CLIENT_API not provided
//     credentials: true,
//   })
// );

const allowedOrigins = [process.env.CLIENT_API, "https://minutedesigns.in/"];

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.get("/test-env", (req, res) => {
  res.send(`CLIENT_API is set to: ${process.env.CLIENT_API}`);
});

app.use(express.json());

// Create router for API v1
const apiV1Router = express.Router();

// Base API endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Live API is working!" });
});

// Static file route for uploads
apiV1Router.use(
  "/uploads",
  express.static(path.join(__dirname, "public/uploads")),
);

// API routes
apiV1Router.use("/auth", authRoutes);
apiV1Router.use("/user", userRoutes);
apiV1Router.use("/contactUs", contactRoutes);
apiV1Router.use("/blog", blogRoutes);
apiV1Router.use("/testimonial", testimonialRoutes);
apiV1Router.use("/page", pageRoutes);
apiV1Router.use("/service", serviceRoutes);
apiV1Router.use("/category", categoryRoutes);
apiV1Router.use("/gallery", galleryRoutes);
apiV1Router.use("/websiteSettings", websiteSettingsRoutes);
apiV1Router.use("/portfolio", portfolioRoutes);
apiV1Router.use("/site", sitePageRoutes);


// Use router
app.use("", apiV1Router);

// Start the server and connect to the database
const startApp = async () => {
  try {
    await connectDB();
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

// Start the application
startApp();

export default app;
