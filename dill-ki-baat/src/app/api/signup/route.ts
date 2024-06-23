import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/user";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();

    const findUser = await UserModel.findOne({ username });

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
