import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { container } from "../di/container";

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

        const cloudinaryImage = await container.cloudinaryService.uploadImage(
          req.file.buffer,
          "posts"
        );

        req.body[fieldName] = cloudinaryImage.secure_url;
        req.body[`${fieldName}PublicId`] = cloudinaryImage.public_id;
        next();
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        res.status(500).json({ error: "Failed to upload image to Cloudinary" });
      }
    },
  ];
};
