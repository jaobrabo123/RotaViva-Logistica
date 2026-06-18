import { Injectable } from "@nestjs/common";
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import { Readable } from "stream";

@Injectable()
export class MediaService {
    async uploadImage(file: Express.Multer.File, folder = "uploads"): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
                {
                    folder,
                    resource_type: "image",
                    transformation: [{ quality: "auto", fetch_format: "auto" }],
                },
                (
                    error: UploadApiErrorResponse | undefined,
                    result: UploadApiResponse | undefined,
                ) => {
                    if (error) return reject(new Error(error.message));
                    if (!result) return reject(new Error("Upload retornou resultado vazio"));
                    resolve(result);
                },
            );

            Readable.from(file.buffer).pipe(upload);
        });
    }

    async deleteImage(publicId: string) {
        await cloudinary.uploader.destroy(publicId);
    }
}
