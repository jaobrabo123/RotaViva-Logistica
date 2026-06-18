import { Module } from "@nestjs/common";
import { CloudinaryProvider } from "./cloudinary.provider";
import { MediaController } from "./media.controller";
import { MediaService } from "./media.service";

@Module({
    controllers: [MediaController],
    providers: [CloudinaryProvider, MediaService],
    exports: [CloudinaryProvider],
})
export class UploadModule {}
