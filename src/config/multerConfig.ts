import fs from "fs";
import path from "path";
import multer from "multer";

const projectRoot = path.resolve(__dirname, "../../");

// Function to ensure a directory exists and set its permissions
const ensureDirectoryExists = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.chmodSync(dirPath, 0o777);
};

// Function to create multer storage
const createMulterStorage = (uploadDir: string) => {
  ensureDirectoryExists(uploadDir);
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
};

export const serviceUpload = multer({
  storage: createMulterStorage(
    path.join(projectRoot, "public/uploads/services"),
  ),
});

export const galleryUpload = multer({
  storage: createMulterStorage(
    path.join(projectRoot, "public/uploads/gallery"),
  ),
});

export const blogUpload = multer({
  storage: createMulterStorage(path.join(projectRoot, "public/uploads/blog")),
});

export const testimonialUpload = multer({
  storage: createMulterStorage(
    path.join(projectRoot, "public/uploads/testimonial"),
  ),
});

export const pageUpload = multer({
  storage: createMulterStorage(path.join(projectRoot, "public/uploads/page")),
});
export const portFolioUpload = multer({
  storage: createMulterStorage(
    path.join(projectRoot, "public/uploads/portfolio"),
  ),
});

export const websiteSettingsUpload = multer({
  storage: createMulterStorage(
    path.join(projectRoot, "public/uploads/websiteSettings"),
  ),
});

// Dynamic multer storage for user-defined uploads
const createDynamicMulterStorage = (params: {
  folderPath: string;
  folderName: string;
}) => {
  const { folderPath, folderName } = params;

  if (!folderName) {
    throw new Error("folderName is required");
  }

  const uploadDir = path.join(projectRoot, folderPath, folderName);
  ensureDirectoryExists(uploadDir);

  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
};

// Middleware for handling multiple file uploads
export const fileMultipleUpload = (folderPath: string, fieldName: string) => {
  return (req: any, res: any, next: any) => {
    const folderName = req.body.folderName || req.userId; // Default to userId if no folderName

    const params = {
      folderPath: folderPath || "src/public/uploads/",
      folderName: folderName,
    };

    const storage = createDynamicMulterStorage(params);
    const upload = multer({ storage }).array(fieldName, 10); // Accept up to 10 files

    upload(req, res, (err: any) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      next();
    });
  };
};
