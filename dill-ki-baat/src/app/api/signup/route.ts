// pages/api/register.ts
import dbConnect from "@/lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from 'next'

import UserModel from "@/models/user";
import bcrypt from 'bcrypt';
import nextConnect from 'next-connect';
import { upload } from '@/app/helper/multerHelper';
import { uploadOnCloudinary } from '@/app/helper/cloudinary';

// Disable Next.js body parsing, because multer will handle it
export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = nextConnect<NextApiRequest, NextApiResponse>();

// Middleware to handle file upload
handler.use(upload.single('avatar'));

// Export the POST function
export default handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();
    try {
        const { username, email, password } = req.body;

        const findUser = await UserModel.findOne({ username });

        if (findUser) {
            return res.status(400).json({
                success: false,
                message: "User is already registered",
            });
        }

        let avatarUrl = null;
        if (req.file) {
            // Upload the avatar to Cloudinary
            const uploadResult = await uploadOnCloudinary(req.file.path);
            avatarUrl = uploadResult.secure_url; // Get the secure URL of the uploaded image
        }

        // Create a new user if not found
        const newUser = new UserModel({ username, email, password });

        const hashedPassword = await bcrypt.hash(password, 10);
        newUser.password = hashedPassword;
        if (avatarUrl) {
            newUser.avatar = avatarUrl; // Save the avatar URL to the user model
        }

        await newUser.save();
        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user: newUser,
        });
    } catch (error: any) {
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: "An error occurred during registration",
            error: error.message,
        });
    }
});
