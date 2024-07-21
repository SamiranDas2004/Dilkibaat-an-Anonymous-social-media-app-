// app/helper/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!
});

export const uploadOnCloudinary = async (localpath: string) => {
    try {
        if (!localpath) {
            throw new Error("No file path provided");
        }

        const response = await cloudinary.uploader.upload(localpath, {
            resource_type: "auto"
        });

        console.log(response);
        fs.unlinkSync(localpath); // Delete the local file after uploading to Cloudinary
        return response;
    } catch (error: any) {
        if (fs.existsSync(localpath)) {
            fs.unlinkSync(localpath); // Ensure local file is deleted on error
        }
        throw new Error(error.message);
    }
}
