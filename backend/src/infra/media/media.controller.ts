import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { MediaService } from "./media.service";

@Controller("upload")
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    @Post("image")
    @UseInterceptors(
        FileInterceptor("file", {
            storage: memoryStorage(), // buffer em memória, não salva em disco
            fileFilter: (req, file, cb) => {
                if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
                    return cb(new Error("Apenas imagens são permitidas"), false);
                }
                cb(null, true);
            },
            limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
        }),
    )
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        const result = await this.mediaService.uploadImage(file, "products");

        return {
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
        };
    }
}
