// app/helper/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure cloudinary
cloudinary.config({
    cloud_name: 'dfjfjovut',
    api_key: '149544752172973',
    api_secret: 'U5ItBKdO8hDIamslh1OAufRco_k'
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
