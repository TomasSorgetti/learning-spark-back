import { Request, Response, NextFunction } from "express";
import multer from "multer";
import CloudinaryService from "../services/CloudinaryService";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const cloudinaryUpload = (fieldName: string) => {
  return [
    upload.single(fieldName),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.file) return next();

        const cloudinaryService = CloudinaryService;
        const imageUrl = await cloudinaryService.uploadImage(
          req.file.buffer,
          "posts"
        );

        req.body[fieldName] = imageUrl;
        next();
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        res.status(500).json({ error: "Failed to upload image to Cloudinary" });
      }
    },
  ];
};
