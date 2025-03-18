import { v2 as cloudinary } from "cloudinary";
import { cloudinaryConfig } from "../config";

cloudinary.config({
  cloud_name: cloudinaryConfig.NAME,
  api_key: cloudinaryConfig.API_KEY,
  api_secret: cloudinaryConfig.API_SECRET,
});

export class CloudinaryService {
  /**
   * Sube una imagen a Cloudinary desde un buffer
   * @param fileBuffer Buffer del archivo a subir
   * @param folder Carpeta en Cloudinary donde se guardará
   * @returns URL segura de la imagen subida
   */
  async uploadImage(
    fileBuffer: Buffer,
    folder: string = "uploads"
  ): Promise<string> {
    try {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(fileBuffer);
      });
      return (result as any).secure_url;
    } catch (error: any) {
      throw new Error(`Failed to upload image to Cloudinary: ${error.message}`);
    }
  }

  /**
   * Elimina una imagen de Cloudinary por su public_id
   * @param publicId ID público de la imagen en Cloudinary
   */
  async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error: any) {
      throw new Error(
        `Failed to delete image from Cloudinary: ${error.message}`
      );
    }
  }
}

export default new CloudinaryService();
