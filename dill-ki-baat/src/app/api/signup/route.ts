import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/user";
import bcrypt from 'bcrypt'


// app/helper/multerHelper.ts
import multer from 'multer';

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files/my-uploads'); // Destination folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use original file name
    }
});

// Export the multer upload instance
export const upload = multer({ storage: storage });


export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { username, email, password,avatar } = await request.json();

    const findUser = await UserModel.findOne({ username });
//ec456eb39f082796cc8768dbf958b04e971212c2
    if (findUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User is already registered",
        },
        { status: 400 }
      );
    }

    // Create a new user if not found
    const newUser = await UserModel.create({ username, email, password });

    const hashedPassword=await bcrypt.hash(password,10);
    newUser.password=hashedPassword;

    newUser.save()
    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error:any) {
    console.log(error.message);
    
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during registration",
      },
      { status: 500 }
    );
  }
}